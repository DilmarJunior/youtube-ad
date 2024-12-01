import { downloadAudio } from "../utils/downloadAudio";

export default {
  name: "download-mixins",

  data() {
    return {
      loading: false,
    };
  },

  methods: {
    async downloadMixin_generateDownloadLinks(value, urls, multiples) {
      this.loading = true;
      const downloadResults = await downloadAudio(value)

      if (!downloadResults?.length) {
        alert(`${downloadResults}`);
        this.loading = false;
        return
      }

      this.loading = !downloadResults.length;
      if (urls) {
        downloadResults.forEach((links, index) => {
          this.urls[index].linkAudio = links.linkAudio;
        });
        return;
      }

      if (!urls && multiples) {
        downloadResults.forEach((links, index) => {
          this.videosEncontrados[index].linkAudio = links.linkAudio;
        });
        return;
      }

      if (this.indexSelectedVideo !== "") {
        this.videosEncontrados[this.indexSelectedVideo].linkAudio =
          downloadResults[0].linkAudio;
      }
    },

    downloadMixin_donwload(link) {
      const linkElement = document.createElement("a");
      linkElement.href = link;
      linkElement.click();
    },
  },
};
