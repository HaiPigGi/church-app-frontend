
// To get the JWTTOKEN from session storage.
function getJwtToken() {
  return sessionStorage.getItem('jwtToken');
}
export async function post_saran(postData) {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/saran/store`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
            Authorization: `bearer ${getJwtToken()}`,
        },
        body: postData,
      },
    );
   return res;
  } catch (e) {
    // console.log('error in Saran Post : ', e.message);
  }
}
