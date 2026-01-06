@echo off
chcp 65001 >nul
setlocal EnableExtensions EnableDelayedExpansion

echo ==============================
echo  СБОРКА VPK ИЗ pak03_dir
echo ==============================
echo.

REM Валидация vpk.exe
if not exist "vpk.exe" (
    echo [ОШИБКА] vpk.exe не найден в текущей папке.
    echo Запускайте скрипт рядом с vpk.exe
    echo.
    pause
    exit /b 1
)

REM Валидация папки
if not exist "pak03_dir\123" (
    echo [ОШИБКА] Папка pak03_dir\123 не найдена.
    echo.
    pause
    exit /b 1
)

REM Валидация файла
if not exist "pak03_dir\123\123.webm" (
    echo [ОШИБКА] Файл 123.webm не найден.
    echo.
    pause
    exit /b 1
)

REM Валидация расширения
set "file=pak03_dir\123\123.webm"
if /I not "%file:~-5%"==".webm" (
    echo [ОШИБКА] Файл не является .webm
    echo.
    pause
    exit /b 1
)

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
