# Installing CML as a Package

<admon>

Installing CML directly in CI environment is not typically needed, as comes
pre-installed in our provided [Docker Images]. Alternatively, GitHub users can
use the [`setup-cml` action].

[docker images]: /doc/self-hosted-runners#docker-images
[`setup-cml` action]: /doc/start/github#setup-action

</admon>

CML can be installed directly as a [Node.js](https://nodejs.org) package using
`npm`.

<details>

### Installing Node.js

<toggle>
<tab title="GitLab">

Install Node.js from source:

```cli
$ curl -sL https://deb.nodesource.com/setup_16.x | bash
$ apt-get update
$ apt-get install -y nodejs
```

</tab>
<tab title="GitHub">

Node.js is likely already available in most GitHub Actions runners. However, to
install a particular version, add the following step to your workflow:

```yaml
- uses: actions/setup-node@v1
  with:
    node-version: '16'
```

</tab>
</toggle>

</details>

```cli
$ npm i -g @dvcorg/cml
```

To use [DVC plots], you need to install these additional dependencies:

```cli
$ sudo apt-get install -y \
  libcairo2-dev libfontconfig-dev \
  libgif-dev libjpeg-dev libpango1.0-dev librsvg2-dev
$ npm install -g vega-cli vega-lite
```

[dvc plots]: https://dvc.org/doc/command-reference/plots
