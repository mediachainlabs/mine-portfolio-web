import fetch from 'isomorphic-fetch';

const makeImgixUrl = (url) => url.replace(__S3_ORIGIN__, __IMGIX_ORIGIN__);

const uploadCredentials = async (contentType) => {
  const [kind, type] = contentType.toLowerCase().split('/');
  if (kind !== 'image') {
    throw new Error('File is not an image');
  }

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const resp = await fetch(__S3_POLICY_URL__, {
    headers,
    method: 'post',
    body: JSON.stringify({ extension: type }),
  });

  return resp.json();
};

const uploadFileWithCred = async ({policy, s3BucketName}, fileOrBlob, contentType = null) => {
  const data = new FormData();
  for (let key in policy) data.append(key,policy[key]);
  data.append('Content-Type', contentType || fileOrBlob.type);
  data.append('file', fileOrBlob);

  const s3Url = `https://${s3BucketName}.s3.amazonaws.com`;
  const readURL = [s3Url, policy.key].join('/');

  try {
    const resp = await fetch(s3Url, {
      method: 'post',
      body: data
    });

    if (resp.status >= 200 && resp.status < 300) {
      const imgixUrl = makeImgixUrl(readURL);
      console.log(`uploaded to: ${readURL} (imgix: ${imgixUrl})`);
      return imgixUrl;
    }
    throw new Error(resp.statusText);
  } catch (e) {
    console.log(e);
    throw(e);
  }
};

export const uploadFile = async (file) => {
  const cred = await uploadCredentials(file.type);
  return uploadFileWithCred(cred, file);
};

