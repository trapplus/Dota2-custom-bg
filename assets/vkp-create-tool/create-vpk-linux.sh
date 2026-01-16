#!/usr/bin/env bash

set -e

VPK_DIR="pak03_dir"
VIDEO_DIR="$VPK_DIR/123"
VIDEO_FILE="$VIDEO_DIR/123.webm"

echo "=============================="
echo " СБОРКА VPK ИЗ pak03_dir" для Linux"
echo " Внимание:"
echo " - Используется vpk.exe - запуск через wine"
echo " - Убедитесь, что wine установлен"
echo "=============================="
echo

# Валидацияя бинаря
if [[ -x "./vpk" ]]; then
  VPK_CMD="./vpk"
elif [[ -f "./vpk.exe" ]]; then
  VPK_CMD="wine vpk.exe"
else
  echo "[ОШИБКА] vpk или vpk.exe не найден в текущей директории."
  echo "Скрипт должен лежать рядом с vpk.exe"
  read -r
  exit 1
fi

# Валидация директории
if [[ ! -d "$VIDEO_DIR" ]]; then
  echo "[ОШИБКА] Папка $VIDEO_DIR не найдена."
  read -r
  exit 1
fi

# Валидация наличия файла
if [[ ! -f "$VIDEO_FILE" ]]; then
  echo "[ОШИБКА] Файл 123.webm не найден в $VIDEO_DIR"
  read -r
  exit 1
fi

# Валидация расширение видео
if [[ "${VIDEO_FILE##*.}" != "webm" ]]; then
  echo "[ПРЕДУПРЕЖДЕНИЕ] Файл не является .webm"
  read -r
  exit 1
fi

echo "Файл найден: $VIDEO_FILE"
echo
echo "Запуск сборки VPK..."
echo

# Сборка vpk
if ! $VPK_CMD "$VPK_DIR"; then
  echo
  echo "[ОШИБКА] Сборка VPK завершилась с ошибкой."
  read -r
  exit 1
fi

echo
echo "[ГОТОВО] ${VPK_DIR}.vpk успешно создан."
echo
echo "Нажмите Enter для выхода..."
read -r
