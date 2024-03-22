import { 
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
} from '@snap/camera-kit'

(async function() {
    var cameraKit = await bootstrapCameraKit({
        apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzEwNzM5NjY5LCJzdWIiOiI0ZWQ1MDVmMS0zNWEyLTQyZmMtOTkxYi1lMTljYmRhNjM3MmV-U1RBR0lOR340MjQwZjdhNi04ODJkLTQ0ODYtYTg4Yi1jZGEyYjcwNWUxMWEifQ.BPj2wsv2jCwEnmO3-BqwY4q73Mv2HWU3c6QrOZATNag'
    })
    const session = await cameraKit.createSession();
    document.getElementById('canvas').replaceWith(session.output.live)

    const { lenses } = await cameraKit.lensRepository.loadLensGroups(['771becad-5c50-4c2a-80b7-ac824a6922da'])

    session.applyLens(lenses[0])
    let mediaStream = await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});

    const source = createMediaStreamSource(mediaStream, {
        cameraType:'back'
    })

    await session.setSource(source)

    session.source.setRenderSize(window.innerWidth,window.innerHeight)

    session.play()
})();
