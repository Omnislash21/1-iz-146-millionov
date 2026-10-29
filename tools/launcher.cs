// Запускалка игры: открывает index.html (лежит рядом с exe) в браузере по умолчанию.
// Сборка: C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe /target:winexe /out:Играть.exe tools\launcher.cs
using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;

class Launcher {
  [STAThread]
  static void Main() {
    string dir = AppDomain.CurrentDomain.BaseDirectory;
    string page = Path.Combine(dir, "index.html");
    if (!File.Exists(page)) {
      MessageBox.Show("Не найден index.html рядом с программой:\n" + page, "1 из 146 миллионов", MessageBoxButtons.OK, MessageBoxIcon.Error);
      return;
    }
    Process.Start(new ProcessStartInfo(page) { UseShellExecute = true });
  }
}
