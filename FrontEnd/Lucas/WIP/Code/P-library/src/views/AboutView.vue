<template>
  <div>
    <input type="file" @change="handlerFileUpload">
    <button @click="uploadFile">Upload</button>

    <div v-for="(image, index) in imageUrls" :key="index">
      <img :src="image" alt="Image">
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import storage from './firebase.js';

export default {
  setup() {
    const selectedFile = ref(null);
    const imageUrls = ref([]);

    const handlerFileUpload = (event) => {
      const file = event.target.files[0];
      selectedFile.value = file;
    };

    const uploadFile = async () => {
      if (selectedFile.value) {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(selectedFile.value.name);
        await fileRef.put(selectedFile.value);
        console.log('File uploaded successfully!');
        // Rafraîchir la liste des images après le téléversement
        await refreshImageUrls();
      }
    };

    const refreshImageUrls = async () => {
      // Référence au stockage Firebase
      const storageRef = storage.ref();

      try {
        // Récupérer la liste des fichiers dans le stockage Firebase
        const listResult = await storageRef.listAll();

        // Réinitialiser la liste des URL des images
        imageUrls.value = [];

        // Pour chaque fichier trouvé, obtenir l'URL de téléchargement
        await Promise.all(listResult.items.map(async (item) => {
          const imageUrl = await item.getDownloadURL();
          imageUrls.value.push(imageUrl);
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des images :', error);
      }
    };

    // Appel initial pour afficher les images existantes
    refreshImageUrls();

    return {
      handlerFileUpload,
      uploadFile,
      imageUrls,
    };
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>