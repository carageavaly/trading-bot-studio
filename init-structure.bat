@echo off
echo === Initializare structura trading-bot ===

REM ---------------------------------------------------------
REM CREARE FOLDERE
REM ---------------------------------------------------------

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

echo === Foldere create ===

REM ---------------------------------------------------------
REM CREARE FISIERE + CONTINUT MINIMAL
REM ---------------------------------------------------------

REM electron/main/main.ts
if not exist electron\main\main.ts (
echo import { app, BrowserWindow } from 'electron';> electron\main\main.ts
echo import path from 'path';>> electron\main\main.ts
echo.>> electron\main\main.ts
echo let mainWindow: BrowserWindow ^| null = null;>> electron\main\main.ts
echo.>> electron\main\main.ts
echo const createWindow = () => {>> electron\main\main.ts
echo   mainWindow = new BrowserWindow({>> electron\main\main.ts
echo     width: 1280,>> electron\main\main.ts
echo     height: 800,>> electron\main\main.ts
echo     webPreferences: {>> electron\main\main.ts
echo       preload: path.join(__dirname, '../preload/preload.js'),>> electron\main\main.ts
echo     },>> electron\main\main.ts
echo   });>> electron\main\main.ts
echo.>> electron\main\main.ts
echo   if (process.env.VITE_DEV_SERVER_URL) {>> electron\main\main.ts
echo     mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);>> electron\main\main.ts
echo   } else {>> electron\main\main.ts
echo     mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));>> electron\main\main.ts
echo   }>> electron\main\main.ts
echo };>> electron\main\main.ts
echo.>> electron\main\main.ts
echo app.whenReady().then(createWindow);>> electron\main\main.ts
echo.>> electron\main\main.ts
echo app.on('window-all-closed', () => {>> electron\main\main.ts
echo   if (process.platform !== 'darwin') app.quit();>> electron\main\main.ts
echo });>> electron\main\main.ts
)

REM preload.ts
if not exist electron\preload\preload.ts (
echo import { contextBridge, ipcRenderer } from 'electron';> electron\preload\preload.ts
echo.>> electron\preload\preload.ts
echo contextBridge.exposeInMainWorld('api', {>> electron\preload\preload.ts
echo   auth: {>> electron\preload\preload.ts
echo     login: (payload) => ipcRenderer.invoke('auth:login', payload),>> electron\preload\preload.ts
echo     register: (payload) => ipcRenderer.invoke('auth:register', payload),>> electron\preload\preload.ts
echo   },>> electron\preload\preload.ts
echo   trading: {>> electron\preload\preload.ts
echo     getStatus: () => ipcRenderer.invoke('trading:status'),>> electron\preload\preload.ts
echo   },>> electron\preload\preload.ts
echo });>> electron\preload\preload.ts
)

REM ipc-auth.ts
if not exist electron\main\ipc\ipc-auth.ts (
echo import { ipcMain } from 'electron';> electron\main\ipc\ipc-auth.ts
echo.>> electron\main\ipc\ipc-auth.ts
echo ipcMain.handle('auth:login', async (_, payload) => {>> electron\main\ipc\ipc-auth.ts
echo   return { success: true, user: { email: payload.email } };>> electron\main\ipc\ipc-auth.ts
echo });>> electron\main\ipc\ipc-auth.ts
echo.>> electron\main\ipc\ipc-auth.ts
echo ipcMain.handle('auth:register', async (_, payload) => {>> electron\main\ipc\ipc-auth.ts
echo   return { success: true, user: { email: payload.email } };>> electron\main\ipc\ipc-auth.ts
echo });>> electron\main\ipc\ipc-auth.ts
)

REM ipc-trading.ts
if not exist electron\main\ipc\ipc-trading.ts (
echo import { ipcMain } from 'electron';> electron\main\ipc\ipc-trading.ts
echo import { getDemoAccount } from '../core/storage/user-store';>> electron\main\ipc\ipc-trading.ts
echo.>> electron\main\ipc\ipc-trading.ts
echo ipcMain.handle('trading:status', async () => {>> electron\main\ipc\ipc-trading.ts
echo   return getDemoAccount();>> electron\main\ipc\ipc-trading.ts
echo });>> electron\main\ipc\ipc-trading.ts
)

REM shared/types/trading.ts
if not exist shared\types\trading.ts (
echo export type TradingMode = 'DEMO' ^| 'LIVE';> shared\types\trading.ts
echo.>> shared\types\trading.ts
echo export interface TradingPair {>> shared\types\trading.ts
echo   symbol: string;>> shared\types\trading.ts
echo   enabled: boolean;>> shared\types\trading.ts
echo }>> shared\types\trading.ts
echo.>> shared\types\trading.ts
echo export interface AccountState {>> shared\types\trading.ts
echo   mode: TradingMode;>> shared\types\trading.ts
echo   balance: number;>> shared\types\trading.ts
echo   equity: number;>> shared\types\trading.ts
echo   unrealizedPnl: number;>> shared\types\trading.ts
echo }>> shared\types\trading.ts
)

REM user-store.ts
if not exist electron\main\core\storage\user-store.ts (
echo import type { AccountState } from '../../../../shared/types/trading';> electron\main\core\storage\user-store.ts
echo.>> electron\main\core\storage\user-store.ts
echo const DEMO_INITIAL_BALANCE = 50000;>> electron\main\core\storage\user-store.ts
echo.>> electron\main\core\storage\user-store.ts
echo let demoAccount: AccountState = {>> electron\main\core\storage\user-store.ts
echo   mode: 'DEMO',>> electron\main\core\storage\user-store.ts
echo   balance: DEMO_INITIAL_BALANCE,>> electron\main\core\storage\user-store.ts
echo   equity: DEMO_INITIAL_BALANCE,>> electron\main\core\storage\user-store.ts
echo   unrealizedPnl: 0,>> electron\main\core\storage\user-store.ts
echo };>> electron\main\core\storage\user-store.ts
echo.>> electron\main\core\storage\user-store.ts
echo export const getDemoAccount = () => demoAccount;>> electron\main\core\storage\user-store.ts
echo export const resetDemoAccount = () => {>> electron\main\core\storage\user-store.ts
echo   demoAccount = { ...demoAccount, balance: DEMO_INITIAL_BALANCE, equity: DEMO_INITIAL_BALANCE, unrealizedPnl: 0 };>> electron\main\core\storage\user-store.ts
echo };>> electron\main\core\storage\user-store.ts
)

REM src/main.tsx
if not exist src\main.tsx (
echo import React from 'react';> src\main.tsx
echo import ReactDOM from 'react-dom/client';>> src\main.tsx
echo import App from './pages/AppPage';>> src\main.tsx
echo.>> src\main.tsx
echo ReactDOM.createRoot(document.getElementById('root')!).render(^<App /^>);>> src\main.tsx
)

REM AppPage.tsx
if not exist src\pages\AppPage.tsx (
echo import React from 'react';> src\pages\AppPage.tsx
echo export default function AppPage() {>> src\pages\AppPage.tsx
echo   return ^<div^>Trading Bot UI^</div^>;>> src\pages\AppPage.tsx
echo }>> src\pages\AppPage.tsx
)

echo === Toate fișierele au fost generate cu succes! ===
pause
