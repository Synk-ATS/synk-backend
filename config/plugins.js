module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  // upload: {
  //   config: {
  //     provider: "strapi-provider-upload-imagekit",  // Community providers need to have the full package name
  //     providerOptions: {
  //       publicKey: env('IMAGEKIT_PUBLIC_KEY'),
  //       privateKey: env('IMAGEKIT_PRIVATE_KEY'),
  //       urlEndpoint: env('IMAGEKIT_URL_EP'),
  //
  //       // Optional
  //       params: {
  //         folder: env('IMAGEKIT_FOLDER')  // Defaults to "/" if value is not supplied
  //       }
  //     }
  //   }
  // }
});
