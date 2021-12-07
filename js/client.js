export const fingerprint = () => {
    // Create a new ClientJS object
    const client = new ClientJS();

    // Get the client's fingerprint id
    const fingerprint = client.getFingerprint();

    // Print the 32bit hash id to the console
    console.log(fingerprint);
} 