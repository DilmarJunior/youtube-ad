<template>
  <v-card
    id="card-urls"
    title="Download por Link"
    subtitle="Adicione os Links dos videos para download"
  >
    <v-container>
      <v-row v-for="(url, index) in urls" :key="index">
        <!-- Campo de inserir URL -->
        <v-col>
          <v-text-field
            :id="`input-text-url-${index}`"
            v-model="urls[index].linkPesquisa"
          >
            <!-- Botao de Remover URL -->
            <template v-slot:prepend>
              <button-actions
                v-if="index > 0"
                :id="`btn-remover-url-${index}`"
                icon="trash"
                color-btn="red-lighten-2"
                @onClickFunction="handleUrls(index)"
              />
            </template>

            <!-- Botao de Adicionar URL -->
            <template v-slot:append>
              <button-actions
                v-if="index < urls.length"
                :id="`btn-adicionar-url-${index}`"
                icon="plus"
                parameter="adicionar"
                color-btn="green-lighten-2"
                @onClickFunction="handleUrls(index, 'adicionar')"
              />
              <button-actions
                v-if="loading || url.linkAudio"
                :id="`btn-url-download-${index}`"
                icon="angles-down"
                class-btn="ma-2"
                color-btn="purple-lighten-3"
                :loading-btn="loading"
                @onClickFunction="downloadMixin_donwload(url.linkAudio)"
              />
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-content-end">
          <button-actions
            id="btn-url-download"
            icon="download"
            text="Gerar Download"
            @onClickFunction="prepareData(urls)"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
  
<script>
import downloadMixin from "../../mixins/download";
import ButtonActions from "../buttons/ButtonActions";

export default {
  name: "card-urls",

  mixins: [downloadMixin],

  components: {
    ButtonActions,
  },

  data() {
    return {
      urls: [
        {
          linkPesquisa: "",
          linkAudio: "",
        }
      ],
    };
  },

  methods: {
    handleUrls(index, acao) {
      if (acao === "adicionar") {
        this.urls.splice(index + 1, 0, {
          linkPesquisa: "",
          linkAudio: "",
        });
        return;
      }

      this.urls.splice(index, 1);
    },

    prepareData(urls) {
      if (!urls[0].linkPesquisa) { return }
      
      const videoIds = urls.map((url) => {
        // Match Regex para capturar o id do video quando URL esta no padrao https://youtu.be/VIDEO_ID?si=8XXX8XXXX8XXX
        const matchUrlLong = url.linkPesquisa.match(/(?<=youtu\.be\/)[\w-]+/gm);

        // Match Regex para capturar o id do video quando URL esta no padrao https://www.youtube.com/watch?v=VIDEO_ID
        const matchUrlShort = url.linkPesquisa.match(/(?<=v=)[\w-]+/gm);

        const videoIdLong =
          matchUrlLong && matchUrlLong.length ? matchUrlLong[0] : "";
        const videoIdShort =
          matchUrlShort && matchUrlShort.length ? matchUrlShort[0] : "";

        return videoIdLong || videoIdShort;
      });

      const formatedVideosIds = videoIds.filter((videoId) => videoId);
      this.downloadMixin_generateDownloadLinks(formatedVideosIds, true);
    },
  },
};
</script>

  