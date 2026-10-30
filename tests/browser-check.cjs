// Проверка offline UI. Требует установленный Playwright и Chrome (только для разработки).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'docs', 'verification');
const crypto = require('crypto');
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const indexSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const sourceHashes = Object.fromEntries([...indexSource.matchAll(/src="(js\/[^\"]+)"/g)].map(m=>[m[1],digest(fs.readFileSync(path.join(root,m[1].replace(/\?.*$/,''))))]));
fs.mkdirSync(out, {recursive:true});
(async () => {
 const browser = globalThis.testBrowser = await chromium.launch({headless:true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? {executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE} : {channel:'chrome'})});
 const context = await browser.newContext({viewport:{width:1440,height:1000}, acceptDownloads:true});
 const page = await context.newPage();
 const errors=[], requests=[];
 page.on('pageerror', e=>errors.push(e.message));
 page.on('request', r=>requests.push(r.url()));
 await page.goto(pathToFileURL(path.join(root,'index.html')).href);
 await page.clock.install();
 await page.locator('details summary').click();
 await page.locator('#seed').fill('1001');
 await page.locator('input[value=f]').check();
 await page.locator('#birthForm button').click();
 await page.locator('#auto').check();
 await page.locator('[data-sp="16"]').click();
 await page.locator('#spy').evaluate(e=>{e.value='5';e.dispatchEvent(new Event('input'));});
 await page.clock.runFor(30000);
 if(await page.locator('#report').getAttribute('class') === 'screen hidden') throw Error('Авто: отчёт не появился');
 let auto = await page.evaluate(()=>JSON.parse(localStorage.getItem('rl_autosave_v1')));
 if(!auto.over || !auto.person.alive || windowAge(auto)!==25) throw Error('Авто: неверный конец '+windowAge(auto));
 await page.screenshot({path:path.join(out,'auto-age25.png'),fullPage:true});
 // Проверяем JSON, сформированный реальным обработчиком экспорта; системный менеджер загрузок в тест не входит.
 await page.evaluate(()=>{
  const createURL=URL.createObjectURL.bind(URL);
  URL.createObjectURL=blob=>{window.__testExportBlob=blob;return createURL(blob);};
 });
 await page.locator('#rSave').click();
 const exportText=await page.evaluate(()=>window.__testExportBlob.text());
 fs.writeFileSync(path.join(out,'life-export.json'),exportText);
 const exportData=JSON.parse(exportText);
 if(exportData.state.person.alive!==true || windowAge(exportData.state)!==25)throw Error('Неверный JSON экспорта истории');
 const autoResult={seed:1001,sex:'f',age:windowAge(auto),choices:auto.log.filter(x=>x.type==='choice').length,focusAges:auto.person.focusHistory.map(x=>x.age)};
 // Вторая полная жизнь: решения принимаются кнопками модального окна; таймер остановлен между месяцами.
 await page.goto(pathToFileURL(path.join(root,'index.html')).href);
 await page.clock.install();
 await page.locator('details summary').click();
 await page.locator('#seed').fill('1001');
 await page.locator('input[value=f]').check();
 await page.locator('#birthForm button').click();
 await page.locator('#btnPlay').click();
 const seen=[];
 for(let i=0;i<800;i++) {
  const status=await page.evaluate(()=>{
   const vis=id=>!document.getElementById(id).classList.contains('hidden');
   if(vis('report')) return {done:true};
   if(vis('modal')) {
    const title=document.querySelector('#modalBox h2').textContent;
    const buttons=[...document.querySelectorAll('#modalBox button:not([disabled])')];
    let b=buttons.find(x=>x.dataset.f==='study') || buttons.find(x=>x.dataset.f==='health') || buttons[buttons.length-1];
    if(!buttons.some(x=>x.dataset.f)) {
     const patterns=[/10.*класс|Остаться.*школ/,/социально|Социально/,/Поступать: экономика/,/^Бюджет:/,/^Работать$|Пойти работать/,/Отказаться|Не пробовать|Не пить|Не курить|Положить трубку|Вызвать такси|Учить и сдавать|Пока на автобусе|Потом|Остаться у родителей/];
     b=null;for(const re of patterns){b=buttons.find(x=>re.test(x.textContent));if(b)break;} b=b||buttons[buttons.length-1];
    }
    const result={modal:title,choice:b.textContent,info:document.getElementById('hInfo').textContent};
    b.click();return result;
   }
   document.getElementById('btnStep').click();return {step:true,info:document.getElementById('hInfo').textContent};
  });
  if(status.modal){seen.push(status);if(/Приёмная кампания/.test(status.modal)) await page.screenshot({path:path.join(out,'manual-admission-after-choice.png')});}
  if(status.done) break; if(status.info && /^25 /.test(status.info)) { await page.clock.runFor(1000); break; }
  if(i===799) throw Error('Ручной режим: guard');
 }
 // showReport scheduled after600ms, so manual loop can end on over while report still hidden.
 await page.clock.runFor(1000);
 if(await page.locator('#report').isHidden()) throw Error('Ручной режим: нет отчёта');
 const manual=await page.evaluate(()=>JSON.parse(localStorage.getItem('rl_autosave_v1')));
 if(!manual.person.alive || windowAge(manual)!==25) throw Error('Ручной режим: конец в'+windowAge(manual));
 if(!seen.some(x=>x.modal==='Что дальше') || !seen.some(x=>x.modal==='Приёмная кампания')) throw Error('Ручной режим: не увидели поступление');
 await page.screenshot({path:path.join(out,'manual-age25.png'),fullPage:true});
 // Отдельная первая кампания после 11 класса (основная ручная жизнь могла выбрать СПО).
 const schoolAdmission=await page.evaluate(()=>{
  for(let seed=1001;seed<1040;seed++){
   const s=RL.Game.create({sex:'f',firstName:'Анна',lastName:'Выпускница',birthYear:2003},seed);
   for(let n=0;n<900&&!s.over;n++){
    if(s.pending){
     if(s.pending.id==='admission_plan'&&s.person.education.stage==='graduate'&&s.person.education.ege&&!s.person.education.ege.failed&&s.pending.opts.some(o=>o.kind==='field'&&o.score>=60))return s;
     RL.Game.autoResolve(s);
    }else RL.Game.step(s);
   }
  }return null;
 });
 if(!schoolAdmission)throw Error('Не нашли естественную кампанию после11');
 const admissionPath=path.join(out,'admission-fixture.json');fs.writeFileSync(admissionPath,JSON.stringify(schoolAdmission));
 await page.goto(pathToFileURL(path.join(root,'index.html')).href);await page.clock.install();
 await page.locator('#importFile').setInputFiles(admissionPath);await page.clock.runFor(2000);
 await page.locator('#modalBox h2').filter({hasText:'Что дальше'}).waitFor();
 await page.screenshot({path:path.join(out,'after-school-plan.png')});
 const fieldIndex=await page.locator('#modalBox button').evaluateAll(bs=>bs.map((b,i)=>({i,score:+((b.textContent.match(/балл ≈ (\\d+)/)||[])[1]||0)})).sort((a,b)=>b.score-a.score)[0].i); await page.locator('#modalBox button').nth(fieldIndex).click();
 await page.locator('#modalBox h2').filter({hasText:'Приёмная кампания'}).waitFor();
 await page.screenshot({path:path.join(out,'after-school-results.png')});
 const schoolOptions=await page.locator('#modalBox').innerText();
 await page.locator('#modalBox button').filter({hasText:/Бюджет:|Платно:|Заочно/}).first().click();
 const schoolEdu=await page.locator('#edu').innerText();
 if(!/курс|университет|институт/i.test(schoolEdu))throw Error('После зачисления не показана учёба');
 // Импорт реальной повестки из моделирования, не искусственного DOM.
 const draft=await page.evaluate(()=>{
  for(let seed=1;seed<40;seed++){
   const s=RL.Game.create({sex:'m',firstName:'Иван',lastName:'Проверкин',birthYear:1985},seed);
   for(let n=0;n<1000&&!s.over;n++){
    if(s.pending){if(s.pending.id==='draft_notice')return s;RL.Game.autoResolve(s);}else RL.Game.step(s);
   }
  }return null;
 });
 if(!draft)throw Error('Не нашли естественную повестку');
 const savePath=path.join(out,'draft-fixture.json');fs.writeFileSync(savePath,JSON.stringify(draft));
 await page.goto(pathToFileURL(path.join(root,'index.html')).href);
 await page.clock.install();
 await page.locator('#importFile').setInputFiles(savePath);
 await page.clock.runFor(2000);
 if(!await page.locator('#modalBox h2').filter({hasText:'Повестка'}).isVisible()) throw Error('Импорт: окно повестки не показано');
 await page.screenshot({path:path.join(out,'draft-notice.png')});
 await page.locator('#modalBox button').filter({hasText:'Пойти служить'}).click();
 await page.locator('#btnStep').click();
 await page.locator('#btnSave').click(); const saveState=await page.evaluate(()=>Object.values(JSON.parse(localStorage.getItem('rl_saves_v1'))).slice(-1)[0]); if(!saveState.person.army)throw Error('Служба не сохранилась'); const edu=await page.locator('#edu').innerText();
 if(!/служб|арм|призыв/i.test(edu))throw Error('После решения нет службы: '+edu);
 const remote=requests.filter(x=>/^https?:/.test(x));
 if(errors.length)throw Error('Ошибки браузера: '+errors.join('; '));
 if(remote.length)throw Error('Внешние запросы: '+remote.join('; '));
 const result={sourceHashes,indexSha256:digest(indexSource),browser:await browser.version(),url:page.url(),auto:autoResult,manual:{age:windowAge(manual),choices:seen.length,admissionChoices:seen.filter(x=>/Что дальше|Приёмная кампания/.test(x.modal)),focusAges:manual.person.focusHistory.map(x=>x.age)},afterSchool:{seed:schoolAdmission.seed,age:windowAge(schoolAdmission),options:schoolOptions,education:schoolEdu},draft:{seed:draft.seed,age:windowAge(draft),savedService:true,serviceText:edu},pageErrors:errors,remoteRequests:remote};
 fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify(result,null,2));
 await browser.close();
})().catch(async e=>{console.error(e.stack);if(globalThis.testBrowser)await globalThis.testBrowser.close();process.exitCode=1;});
function windowAge(s){return ((s.date.year-s.birth.year)*12+s.date.month-s.birth.month)/12;}






