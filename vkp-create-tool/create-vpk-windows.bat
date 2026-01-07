@echo off
chcp 65001 >nul
setlocal EnableExtensions EnableDelayedExpansion

echo ==============================
echo  СБОРКА VPK ИЗ pak03_dir для Windows
echo ==============================
echo.

echo Файл найден: pak03_dir\123\123.webm
echo.
echo Запуск сборки VPK...
echo.

vpk.exe pak03_dir

if errorlevel 1 (
    echo.
    echo [ОШИБКА] Сборка VPK завершилась с ошибкой.
) else (
    echo.
    echo [ГОТОВО] pak03_dir.vpk успешно создан.
)

echo.
pause
