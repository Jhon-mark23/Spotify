// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQBZfJm8t1Pv74bgiQvZxy-Kp4B7kAtXOM7GKUnXcm26Wac5laWItt1hiGkY9l3cj-mFqKq5W0IWyn5dgAvwnS5gmMVHEW3TFvV2XqVZuAEqlh8DQWPmKUXd-thUNl6ed0lC6uug66vMh8sUewCuVoydfbhEoJ5ICvxZEHmTJ6RnKhz0rquiOqK-h3I-XCj9CMyn7r_fqZey4HvoSknODFPQw6cgwpeTsp9iKI_NTMG9m5rJY51g_P-_X10hb2LrDoMp7HTYlWJUHg985iKSYrIxadBQoSmX';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQBZfJm8t1Pv74bgiQvZxy-Kp4B7kAtXOM7GKUnXcm26Wac5laWItt1hiGkY9l3cj-mFqKq5W0IWyn5dgAvwnS5gmMVHEW3TFvV2XqVZuAEqlh8DQWPmKUXd-thUNl6ed0lC6uug66vMh8sUewCuVoydfbhEoJ5ICvxZEHmTJ6RnKhz0rquiOqK-h3I-XCj9CMyn7r_fqZey4HvoSknODFPQw6cgwpeTsp9iKI_NTMG9m5rJY51g_P-_X10hb2LrDoMp7HTYlWJUHg985iKSYrIxadBQoSmX';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const topTracksIds = [
  '1qosh64U6CR5ki1g1Rf2dZ','2ONW0ksoUixoxT7gfI9hWX','59xAyBrzAJaEoXfeP9SCHr','0wNf0yIreg4A8C5ZUY6b6Q','5OvRmSitjggIYxAcgWnImV'
];

async function getRecommendations(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
  )).tracks;
}
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQBZfJm8t1Pv74bgiQvZxy-Kp4B7kAtXOM7GKUnXcm26Wac5laWItt1hiGkY9l3cj-mFqKq5W0IWyn5dgAvwnS5gmMVHEW3TFvV2XqVZuAEqlh8DQWPmKUXd-thUNl6ed0lC6uug66vMh8sUewCuVoydfbhEoJ5ICvxZEHmTJ6RnKhz0rquiOqK-h3I-XCj9CMyn7r_fqZey4HvoSknODFPQw6cgwpeTsp9iKI_NTMG9m5rJY51g_P-_X10hb2LrDoMp7HTYlWJUHg985iKSYrIxadBQoSmX';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = [
  'spotify:track:1qosh64U6CR5ki1g1Rf2dZ','spotify:track:1qosh64U6CR5ki1g1Rf2dZ','spotify:track:2ONW0ksoUixoxT7gfI9hWX','spotify:track:2LU0FHcbTGj8iKi70Mzt0I','spotify:track:59xAyBrzAJaEoXfeP9SCHr','spotify:track:5elW2CKSoqjYoJ32AGDxf1','spotify:track:0wNf0yIreg4A8C5ZUY6b6Q','spotify:track:6UGrgPcISfwGeDikA4YpEv','spotify:track:5OvRmSitjggIYxAcgWnImV','spotify:track:7FvD6YZCqZmDoPayPawJcT'
];

async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);

const recommendedTracks = await getRecommendations();
console.log(
  recommendedTracks.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);
const playlistId = '7ceJ02SNdxlh1UcLHHwRaB';

<iframe
  title="Spotify Embed: Recommendation Playlist "
  src={`https://open.spotify.com/embed/playlist/7ceJ02SNdxlh1UcLHHwRaB?utm_source=generator&theme=0`}
  width="100%"
  height="100%"
  style={{ minHeight: '360px' }}
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>
