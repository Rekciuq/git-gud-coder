# This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)

## Getting Started

## First step and it is fully separate of main repo

You need to pull this github repo:
<https://github.com/Rekciuq/go-bucket>

1. you need to cd into directory of this repo
2. you need to run this: go build -o go-bucket-app ./cmd/go-bucket/main.go
3. move the output file named "go-bucket-app" to main repo /bucket/ directory
4. to run project you need to install ffmpeg to convert images and videos and enable streaming

## Second step in main repo

Then you can actually initialize the project with the script

```bash
npm run init
# or
yarn init
# or
pnpm init
# or
bun init
```

## Third step run the project

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
