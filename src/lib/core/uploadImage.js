// lib/uploadImage.js
export const uploadToImageBB = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; 
  
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.success) {
    return data.data.url; // ImageBB Direct Image URL
  } else {
    throw new Error("Image upload failed");
  }
};