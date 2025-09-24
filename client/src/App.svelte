<script>
import { onMount } from 'svelte';
import {getStats, setToken, checkToken} from './api/api.js';

let stats = null;

onMount(async () => {
  let tokenStatus = await checkToken();
  if(tokenStatus.status === 'valid'){
    stats = await getStats();
    return;
  } else {
    await performAuthentication();
  }
});

async function performAuthentication() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  if (code) {
    await setToken(code);
    stats = await getStats();
  }
  else{
    let authUrl = `https://www.strava.com/oauth/authorize?client_id=${import.meta.env.VITE_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:5173/&approval_prompt=force&scope=activity:read_all`;
    window.location.href = authUrl;
  }
}
</script>

<main>
  <h1>Subpar Strava Stats</h1>
  {#if stats}
    <div>
      <h2>Biking</h2>
      {#if stats.all_ride_totals.distance === 0}
        <p>Biking Sucks Doesnt It?</p>
      {:else}
        <p>Total Distance: {stats.all_ride_totals.distance} km</p>
        <p>Total Elevation Gain: {stats.all_ride_totals.elevation_gain} m</p>
      {/if} 
    </div>
    <div>
      <h2>Running</h2>
      {#if stats.all_run_totals.distance === 0}
        <p>Running Sucks Doesnt It?</p>
      {:else}
        <p>Total Distance: {stats.all_run_totals.distance} km</p>
        <p>Total Elevation Gain: {stats.all_run_totals.elevation_gain} m</p>
      {/if}
    </div>
    <div>
      <h2>Swimming</h2>
      {#if stats.all_swim_totals.distance === 0}
        <p>Swimming Sucks Doesnt It?</p>
      {:else}
        <p>Total Distance: {stats.all_swim_totals.distance} km</p>
      {/if}
    </div>
  {:else}
    <p>No stats available</p>
  {/if}
</main>

<style>
  
</style>
