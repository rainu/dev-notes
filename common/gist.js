import axios from 'axios'

export const newGistClient = (token) => {

  const client = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Authorization': 'token ' + token,
    }
  });

  return {

    getAll(){
      return client.get('/gists')
        .then(resp => resp.data)
    },

    list(username){
      return client.get(`/users/${username}/gists`)
        .then(resp => resp.data)
    },

    createNew(isPublic, fileName){
      let data = {
        public: isPublic,
        files: {},
        description: "Backup files for DevNotes - https://github.com/rainu/dev-notes"
      }
      data.files[fileName] = {
        content: "<DevNote placeholder>"
      }

      return client.post(`/gists`, data)
        .then(resp => resp.data)
    },

    saveFile(gistId, filename, content) {
      let data = {
        files: {}
      }
      data.files[filename] = {
        content: content,
      }
      return client.patch(`/gists/${gistId}`, data)
        .then(resp => resp.data)
    },

    saveFiles(gistId, files){
      let gistFiles = {}
      for(let fileName of Object.keys(files)){
        gistFiles[fileName] = {
          content: files[fileName]
        }
      }

      return client.patch(`/gists/${gistId}`, {
        files: gistFiles
      })
      .then(resp => resp.data)
    },

    getFile(gistId, filename) {
      return client.get(`/gists/${gistId}`)
        .then(resp => resp.data)
        .then(data => {
          if(!data.files[filename]) return ""
          if(!data.files[filename].truncated) return data.files[filename].content

          return axios.get(data.files[filename].raw_url)
            .then(resp => resp.data)
        })
    },

  }
}
