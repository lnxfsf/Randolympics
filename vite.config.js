import MillionLint from '@million/lint';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [MillionLint.vite({
    enabled: true
  }), react()],
  build: { sourcemap: false },
  optimizeDeps: {
    include: ['@mui/material/Tooltip'],
  },
  esbuild: (process.env.VITE_NODE_ENV === 'production' || process.env.VITE_NODE_ENV === 'staging') ? {
    drop: ['console', 'debugger'],
  } : {}, 
 

})

