@echo off
echo Creare structura proiect trading-bot...

mkdir electron\main
mkdir electron\preload
mkdir electron\main\ipc
mkdir electron\main\core\broker
mkdir electron\main\core\trading\engine
mkdir electron\main\core\trading\strategies
mkdir electron\main\core\trading\config
mkdir electron\main\core\storage

mkdir shared\types
mkdir shared\utils

mkdir src\router
mkdir src\components\layout
mkdir src\components\auth
mkdir src\components\dashboard
mkdir src\components\trading
mkdir src\pages
mkdir src\services\api
mkdir src\state
mkdir src\styles

echo Structura a fost creata cu succes!
pause
