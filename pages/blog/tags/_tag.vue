<template>
  <div>
    <h1>I am a tag</h1>

    <h2>Params</h2>
    <pre>{{ params }}</pre>

    <h2>Payload</h2>
    <pre>{{ payload }}</pre>
  </div>
</template>

<script>
export default {
  asyncData({ params, error, payload }) {
    return {
      params,
      payload
    };
  }
};
</script>
