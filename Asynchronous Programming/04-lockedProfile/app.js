function lockedProfile() {
  const url = "http://localhost:3030/jsonstore/advanced/profiles";

  async function getProfiles() {
    const profileResponse = await fetch(url);
    const profileData = await profileResponse.json();
    // for (let user in profileData){
    //     console.log(profileData[user].username);
    //     console.log(profileData[user].email);
    //     console.log(profileData[user].age);
    // }
  }
  getProfiles();
}
