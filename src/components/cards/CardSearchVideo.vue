<template>
  <v-card
    id="card-search-video"
    title="Download pesquisando no Youtube"
    subtitle="Pesquise o video que você deseja"
  >
    <v-container>
      <v-row>
        <v-col>
          <!-- Campo input de pesquisa -->
          <v-text-field
            id="input-text-valor-pesquisa"
            v-model="valorPesquisa"
            :loading="loading"
            @keypress.enter="pesquisarVideo"
          >
            <!-- Botao de Adicionar URL -->
            <template v-slot:append>
              <button-actions
                id="btn-pesquisar-video"
                icon="magnifying-glass"
                class-btn="ma-2"
                color-btn="blue-lighten-2"
                @onClickFunction="pesquisarVideo"
              />
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-list lines="two">
            <v-list-item
              v-for="(video, index) in videosEncontrados"
              :key="index"
              :value="video"
              :id="`list-item-${index}`"
              :loading="loading"
              color="primary"
              @click="selectVideo(index, video)"
            >
              <v-container>
                <v-row class="d-flex">
                  <v-col cols="3">
                    <v-list-item-media tag="span">
                      <v-img :src="video.thumbnails.default.url"> </v-img>
                    </v-list-item-media>
                  </v-col>

                  <v-col cols="7">
                    <v-list-item-title>{{ video.title }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ video.channelTitle }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      {{ `Publicado em: ${dataFormat(video.publishedAt)}` }}
                    </v-list-item-subtitle>
                    <br />
                    <v-list-item-subtitle>
                      {{ video.description }}
                    </v-list-item-subtitle>
                  </v-col>

                  <v-col cols="2">
                    <v-container>
                      <v-row>
                        <button-actions
                          v-if="video.linkAudio"
                          :id="`btn-video-searched-download-${index}`"
                          icon="angles-down"
                          class-btn="ma-2"
                          color-btn="purple-lighten-3"
                          @onClickFunction="
                            downloadMixin_donwload(video.linkAudio)
                          "
                        />
                      </v-row>
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>

              <hr v-if="index < videosEncontrados.length - 1" />
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row v-if="videosEncontrados.length">
        <v-col class="d-flex justify-content-end">
          <button-actions
            id="btn-video-searched-download"
            icon="download"
            text="Gerar Download Todos"
            @onClickFunction="prepareData()"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
  
<script>
import downloadMixin from "../../mixins/download";
import ButtonActions from "../buttons/ButtonActions";
import { searchVideoOnYouTube } from '../../utils/searchVideo';

export default {
  name: "card-search-video",

  mixins: [downloadMixin],

  components: {
    ButtonActions,
  },

  data() {
    return {
      valorPesquisa: "",
      videosEncontrados: [],
      indexSelectedVideo: "",
    };
  },

  methods: {
    async pesquisarVideo() {
      if (!this.valorPesquisa) {
        this.videosEncontrados = [];
        return;
      }

      try {
        this.loading = true;
        this.videosEncontrados = await searchVideoOnYouTube(this.valorPesquisa)
        this.loading = !this.videosEncontrados.length;
      } catch {
        (error) => {
          this.loading = false;
          alert(`${error}`);
        };
      }
    },

    dataFormat(value) {
      const date = new Date(value);
      const formattedDate = date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return formattedDate;
    },

    selectVideo(index, video) {
      this.indexSelectedVideo = index;
      this.downloadMixin_generateDownloadLinks([video.videoId], false);
    },

    prepareData() {
      const links = this.videosEncontrados.map((video) => video.videoId);
      this.downloadMixin_generateDownloadLinks(links, false, true);
    },
  },
};
</script>
  