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

function metersToMiles(meters) {
  return (meters * 0.000621371).toFixed(2);
}

function metersToFeet(meters) {
  return (meters * 3.28084).toFixed(2);
}

function formatMovingTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs}h ${mins}m ${secs}s`;
}

</script>

<main>
  <h1>Tour de Nerd™</h1>
  {#if stats}
    <div>
      <h2>Biking</h2>
      {#if stats.all_ride_totals.count === 0}
        <p>Biking Sucks Doesnt It?</p>
      {:else}
        <p><strong>Ride Count:</strong> {stats.all_ride_totals.count}</p>
        <p><strong>Total Distance:</strong> {metersToMiles(stats.all_ride_totals.distance)} mi</p>
        <p><strong>Total Elevation Gain:</strong> {metersToFeet(stats.all_ride_totals.elevation_gain)} ft</p>
        <p><strong>Total Moving Time:</strong> {formatMovingTime(stats.all_ride_totals.moving_time)}</p>
      {/if}
    </div>
    <div>
      <h2>Running</h2>
      {#if stats.all_run_totals.count === 0}
        <p>Running Sucks Doesnt It?</p>
      {:else}
        <p><strong>Run Count:</strong> {stats.all_run_totals.count}</p>
        <p><strong>Total Distance:</strong> {metersToMiles(stats.all_run_totals.distance)} mi</p>
        <p><strong>Total Elevation Gain:</strong> {metersToFeet(stats.all_run_totals.elevation_gain)} ft</p>
        <p><strong>Total Moving Time:</strong> {formatMovingTime(stats.all_run_totals.moving_time)}</p>
      {/if}
    </div>
    <div>
      <h2>Swimming</h2>
      {#if stats.all_swim_totals.count === 0}
        <p>Swimming Sucks Doesnt It?</p>
      {:else}
        <p><strong>Swim Count:</strong> {stats.all_swim_totals.count}</p>
        <p><strong>Total Distance:</strong> {stats.all_swim_totals.distance} meters</p>
        <p><strong>Total Moving Time:</strong> {formatMovingTime(stats.all_swim_totals.moving_time)}</p>
      {/if}
    </div>
  {:else}
    <p>No stats available</p>
  {/if}
</main>

<style>
  
</style>
