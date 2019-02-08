import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import * as deepmerge from 'deepmerge'
import copy from 'rollup-plugin-copy';

/**
 * Globals and Builtins needed
 *   url (imported by node_modules\pdfjs-dist\lib\display\node_stream.js,  commonjs-external:url)
 */

/**
 * Babel-core needed
 * babel-runtime/regenerator (imported by node_modules\pdfjs-dist\lib\display\node_stream.js, node_modules\pdfjs-dist\lib\display\fetch_stream.js, node_modules\pdfjs-dist\lib\display\network.js, node_modules\pdfjs-dist\lib\display\transport_stream.js, node_modules\pdfjs-dist\lib\shared\message_handler.js, node_modules\pdfjs-dist\lib\core\pdf_manager.js, node_modules\pdfjs-dist\lib\core\obj.js, node_modules\pdfjs-dist\lib\core\evaluator.js,  commonjs-external:babel-runtime/regenerator)
 */

/**
 * core-js needed 
 * several in pdfjs-dist/lib/shared/compatibility.js
 */

const commonConfig = {
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs({
      namedExports: {
        'node_modules/buffer/index.js': ['isBuffer'],
        'node_modules/process/browser.js': ['nextTick'],
        'node_modules/events/events.js': ['EventEmitter']
      }
    }),
    globals(),
    builtins(),
  ]
}

export default [
  deepmerge.all([{}, commonConfig, {
    input: './node_modules/pdfjs-dist/lib/pdf.js',
    output: {
      file: './pdf.js',
      format: 'esm'
    },
    plugins: [
      copy({
        './node_modules/pdfjs-dist/build/pdf.worker.js': './pdf.worker.js',
        './node_modules/pdfjs-dist/build/pdf.worker.min.js': './pdf.worker.min.js',
        './node_modules/pdfjs-dist/build/pdf.worker.entry.js': './pdf.worker.entry.js',
        './node_modules/pdfjs-dist/build/pdf.worker.js.map': './pdf.worker.js.map',
        './node_modules/pdfjs-dist/LICENSE': './LICENSE'
      })
    ]
  }]),
  Object.assign({}, commonConfig, {
    input: './node_modules/pdfjs-dist/lib/web/pdf_viewer.js',
    output: {
      file: './pdf_viewer.js',
      format: 'esm'
    },
  }),
  // The original file uses ES6 modules - would be nice to get that directly
  Object.assign({}, commonConfig, {
    input: './node_modules/pdfjs-dist/lib/web/pdf_link_service.js',
    output: {
      file: './pdf_link_service.js',
      format: 'esm'
    },
  })
];

