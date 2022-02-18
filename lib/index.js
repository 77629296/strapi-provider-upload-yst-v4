'use strict';

const axios = require('axios');

const log = (...args) => {
  strapi.log.debug('>>>>>>> upload <<<<<<<');
  strapi.log.debug(...args);
};

module.exports = {
  init: (config) => {
    return {
      upload: (file) => {
        log(file);
        if (!file) return
        return new Promise((resolve, reject) => {
          const { name: originName, buffer } = file
          const { configCode, uploadUrl, operId, operType } = config
          const fileContent = buffer.toJSON().data

          if(!fileContent) return
 
          const params = {
            configCode,
            fileContent,
            originName,
            operId,
            operType
          }
          
          log('start upload...');
          axios({
            method: 'POST',
            url: uploadUrl,
            data: params,
            maxContentLength: 524288000,
            maxBodyLength: 5242880000
          }).then(function (response) {
            log(response.data);
            const { data } = response.data
            file.url = data.fileUrl
            resolve()
          })
          .catch(function (error) {
            log('error')
            reject(error)
          });
        });
      },
      delete: (file) => {
        return new Promise((resolve, reject) => {
          resolve()
        });
      }
    };
  }
};
