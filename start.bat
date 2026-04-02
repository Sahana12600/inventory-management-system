@echo off
echo ----------------------------------------
echo InventoryMaster Application Starter
echo ----------------------------------------

echo [1/2] Starting Backend Server...
start "Inventory Backend" powershell -NoExit -Command "$env:Path = 'C:\Program Files\nodejs;' + [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); cd backend; npm start"

echo [2/2] Starting Frontend UI...
start "Inventory Frontend" powershell -NoExit -Command "$env:Path = 'C:\Program Files\nodejs;' + [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); cd frontend; npm run dev"

echo.
echo Application is booting up!
echo - Backend will run in a new window on port 5000.
echo - Frontend will run in another window and open in your browser automatically (usually localhost:5173).
echo.
echo Keep both blue windows open to keep the application running.
pause
