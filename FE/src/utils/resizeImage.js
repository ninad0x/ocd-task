export const resizeImage = (file, maxEdge = 2048) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      const scale = Math.min(1, maxEdge / Math.max(image.width, image.height))
      const canvas = document.createElement("canvas")
      canvas.width = Math.round(image.width * scale)
      canvas.height = Math.round(image.height * scale)
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)

      const type = file.type === "image/png" ? "image/png" : "image/jpeg"
      resolve({ dataUrl: canvas.toDataURL(type, 0.9), width: canvas.width, height: canvas.height })
    }

    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Could not read this image"))
    }

    image.src = url
  })