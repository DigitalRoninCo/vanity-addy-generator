#include <solana_sdk.h>

__global__ void generate_keys(
    const char *pattern,
    Keypair *results,
    int batch_size
) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx >= batch_size) return;

    Keypair kp = generate_keypair();
    if (strstr(kp.public_key, pattern) != NULL) {
        results[idx] = kp;
    }
}