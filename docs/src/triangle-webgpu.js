const vs = document.getElementById("vs").textContent;
const fs = document.getElementById("fs").textContent;
init();

async function init() {
    const gpu = navigator["gpu"];
    const adapter = await gpu.requestAdapter();
    const device = await adapter.requestDevice();

    const c = document.getElementById("triangle-canvas");
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    const ctx = c.getContext("webgpu");
    const format = gpu.getPreferredCanvasFormat();
    ctx.configure({
        device: device,
        format: format,
        alphaMode: "opaque"
    });
    const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: device.createShaderModule({
                code: vs
            }),
            entryPoint: "main",
            buffers: [
                {
                    arrayStride: 3 * 4,
                    attributes: [
                        {
                            // position
                            shaderLocation: 0,
                            offset: 0,
                            format: "float32x3"
                        }
                    ]
                }
            ]
        },
        fragment: {
            module: device.createShaderModule({
                code:  fs
            }),
            entryPoint: "main",
            targets: [
                {
                    format: format
                }
            ]
        },
        primitive: {
            topology: "triangle-list"
        }
    });

    const positions = [
         0.0, 0.5, 0.0, // v0
        -0.5,-0.5, 0.0, // v1
         0.5,-0.5, 0.0  // v2
    ];
	let vertexBuffer = makeVertexBuffer(device, new Float32Array(positions));

    const render =  function () {
        const commandEncoder = device.createCommandEncoder();
        const textureView = ctx.getCurrentTexture().createView();
        const renderPassDescriptor = {
            colorAttachments: [{
                view: textureView,
                loadOp: "clear",
                clearValue: {r: 23.0 / 255.0, g: 190.0 / 255.0, b: 187.0 / 255.0, a: 1},
                storeOp: "store"
            }]
        };
        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(pipeline);
        passEncoder.setVertexBuffer(0, vertexBuffer);
        passEncoder.draw(3, 1, 0, 0);
        passEncoder.end();
        device.queue.submit([commandEncoder.finish()]);
    }
    requestAnimationFrame(render);
}

function makeVertexBuffer(device, data) {
    const verticesBuffer = device.createBuffer({
        size: data.byteLength,
        usage: GPUBufferUsage.VERTEX,
        mappedAtCreation: true,
    });
    new Float32Array(verticesBuffer.getMappedRange()).set(data);
    verticesBuffer.unmap();
    return verticesBuffer;
}