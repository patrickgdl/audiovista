# Audiovista

Projeto para criar "audiogramas". Em outras palavras, videoclipes de episódios de podcast ou qualquer outro áudio. É uma forma popular de compartilhar trechos de áudio nas redes sociais.

![radial-record](https://github.com/patrickgdl/audiovista/assets/22237558/effb4ac0-2bad-469e-a153-32271ce878c8)

Comece a mudar as coisas assim:

- Ajuste o tamanho e comprimento em `src/Video.tsx`
- Substituindo áudio, capa e legendas na pasta `public`
- Ajuste o que quiser em `src/Root.tsx`

## Como faço para renderizar meu vídeo?

Rode isto:

```console
npm run build
```

Ou confira os [documentos de remoção](/docs/render/). Existem muitas maneiras de renderizar.

## Onde obter uma transcrição (arquivo SRT)?

Existem alguns lugares:

- O host de podcasting pode fornecer.
- Descript torna a transcrição muito fácil.
- Existem inúmeras outras soluções pagas, como [Otter.ai](https://otter.ai) e [Scriptme.io](https://scriptme.io).
- E soluções de código aberto disponíveis, como [Subs AI](https://github.com/abdeladim-s/subsai)

## Comandos

**Instalar dependências**

```console
npm install
```

**Começar o projeto Next.js**

```
npm run dev
```

**Start do Preview/Remotion Studio**

```console
npm run remotion
```

**Renderizar video**

```console
npm run build
```

**Atualizar o Remotion**

```console
npm run upgrade
```

### Remotion Lambda

The following script will set up your Remotion Bundle and Lambda function on AWS:

```
node deploy.mjs
```

You should run this script after:

- changing the video template
- changing `config.mjs`
- upgrading Remotion to a newer version

## Set up rendering on AWS Lambda

This template supports rendering the videos via [Remotion Lambda](https://remotion.dev/lambda).

1. Copy the `.env.example` file to `.env` and fill in the values.
   Complete the [Lambda setup guide](https://www.remotion.dev/docs/lambda/setup) to get your AWS credentials.

1. Edit the `config.mjs` file to your desired Lambda settings.

1. Run `node deploy.mjs` to deploy your Lambda function and Remotion Bundle.

## Docs

Para entender como funciona o Remotion, você pode começar lendo a [página de fundamentos](https://www.remotion.dev/docs/the-fundamentals).
