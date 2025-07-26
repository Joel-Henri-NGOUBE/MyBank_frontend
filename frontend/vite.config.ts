/// <reference types="vitest" /> 
/// <reference types="vite/client" /> 

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config() // load env vars from .env

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"]
  },
    define: {
    VITE_APP: `"${process.env.VITE_APP}"` // wrapping in "" since it's a string
  }
})
