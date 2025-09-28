// Configuración para ONNX Runtime Web
if (typeof window !== 'undefined') {
  // Configurar ONNX Runtime para usar solo CPU en caso de problemas con WebGL/WebGPU
  window.ort = window.ort || {};
  window.ort.env = window.ort.env || {};
  
  // Configuración conservadora para evitar errores
  window.ort.env.wasm = {
    numThreads: 1,
    simd: false,
    proxy: false
  };
  
  // Desactivar WebGL/WebGPU si causan problemas
  window.ort.env.webgl = {
    disabled: true
  };
  
  window.ort.env.webgpu = {
    disabled: true
  };
}