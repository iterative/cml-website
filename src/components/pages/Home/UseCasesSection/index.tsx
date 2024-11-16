import React, { forwardRef } from "react"

import { Box, Heading, Image } from '@theme-ui/components'

import Collapser from "../../../atoms/Collapser"
import Switch from "../../../organisms/SwitchableMode/Switch"
import Switchable from "../../../organisms/SwitchableMode/Switchable"
import { JSONTabs } from "../../../organisms/Tabs"
import Tooltip from "../../../organisms/Tooltip"

import {
  FullWidthBox,
  ExampleBox,
  Code,
} from "../../../../gatsby-plugin-theme-ui/components"

const UseCasesSection: React.ForwardRefRenderFunction<HTMLElement> = () => (
  <section id="use-cases" style={{scrollMarginTop:"-3.5rem"}} >
    <FullWidthBox
      sx={{
        textAlign: "center",
        py: "1px",
        fontSize: "18px",
        lineHeight: "28px",
        letterSpacing: "0.02em",
        Inner: {
          my: "80px",
          px: [0, null, null, 3]
        }
      }}
    >

      <Heading
        as="h2"
        sx={{
          color: "text",
          fontSize: ["32px", null, "42px"],
          lineHeight: "52px",
          fontWeight: "bold"
        }}
      >
        CML Use Cases
      </Heading>

      <Box sx={{
        mx: "auto",
        px: "10px",
        maxWidth: "635px",
        my: "40px"
      }}>

        The simplest case of using CML, and a clear way for any user to get started, is to generate a simple report. Add the following .yaml to your project repository and commit to get started

      </Box>

      <Switch sx={{ my: 4, maxWidth: "360px", mx: "auto" }} />

      <JSONTabs
        sx={{ "code, img": { maxHeight: "580px" } }}
        content={[
          {
            name: "First CML Report",
            filename: "cml.yaml",
            content: (
              <Switchable
                gitlab={(
                  <Collapser>

                    <Code filename=".gitlab-ci.yml" repo="https://gitlab.com/iterative.ai/cml-base-case">
                      <div><span>train-and-report:</span></div>
                      <div>  <span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div>  <span>script:</span></div>
                      <Tooltip type="dependencies">
                        <div>    <span>- pip install -r requirements.txt</span></div>
                        <div>    <span>- python train.py  # generate plot.png</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <Tooltip type="reports">
                        <div>    <span># Create CML report</span></div>
                        <div>    <span>- cat metrics.txt &gt;&gt; report.md</span></div>
                        <div>    <span>- echo &#x27;![](./plot.png &quot;Confusion Matrix&quot;)&#x27; &gt;&gt; report.md</span></div>
                        <div>    <span>- cml comment create report.md</span></div>
                      </Tooltip>
                    </Code>

                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://gitlab.com/iterative.ai/cml-base-case/-/merge_requests/1">
                        <Image src="/img/gitlab/base-case-report.png" alt="GitLab Base report example" />
                      </a>
                    </ExampleBox>

                  </Collapser>
                )}
                github={(
                  <Collapser>
                    <Code filename=".github/workflows/cml.yaml" repo="https://github.com/iterative/cml_base_case">
                      <div><span>name: CML</span></div>
                      <div><span>on: [push]</span></div>
                      <div><span>jobs:</span></div>
                      <div>  <span>train-and-report:</span></div>
                      <div>    <span>runs-on: ubuntu-latest</span></div>
                      <div>    <span>container: docker://ghcr.io/iterative/cml:0-dvc2-base1</span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v3</span></div>
                      <div>      <span>- run: |</span></div>
                      <Tooltip type="dependencies">
                        <div>          <span>pip install -r requirements.txt</span></div>
                        <div>          <span>python train.py  # generate plot.png</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <Tooltip type="reports">
                        <div>          <span># Create CML report</span></div>
                        <div>          <span>cat metrics.txt &gt;&gt; report.md</span></div>
                        <div>          <span>echo &#x27;![](./plot.png &quot;Confusion Matrix&quot;)&#x27; &gt;&gt; report.md</span></div>
                        <div>          <span>cml comment create report.md</span></div>
                        <div>        <span>env:</span></div>
                        <div>          <span>REPO_TOKEN: {"${{ secrets.GITHUB_TOKEN }}"}</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://github.com/iterative/cml_base_case/pull/2">
                        <Image src="/img/github/base-case-report.png" alt="GitHub Base report example" />
                      </a>
                    </ExampleBox>

                  </Collapser>
                )}
                bitbucket={(
                  <Collapser>
                    <Code filename="bitbucket-pipelines.yml" repo="https://bitbucket.org/iterative-ai/cml-base-case">
                      <div><span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div><span>pipelines:</span></div>
                      <div>  <span>default:</span></div>
                      <div>    <span>- step:</span></div>
                      <div>        <span>name: Train and Report</span></div>
                      <div>        <span>script: </span></div>
                      <Tooltip type="dependencies">
                        <div>          <span>- pip install -r requirements.txt</span></div>
                        <div>          <span>- python train.py  # generate plot.png</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <Tooltip type="reports">
                        <div>          <span># Create CML report</span></div>
                        <div>          <span>- cat metrics.txt &gt;&gt; report.md</span></div>
                        <div>          <span>- echo &#x27;![](./plot.png &quot;Confusion Matrix&quot;)&#x27; &gt;&gt; report.md</span></div>
                        <div>          <span>- cml comment create report.md</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://bitbucket.org/iterative-ai/cml-base-case/pull-requests/1">
                        <Image src="/img/bitbucket/base-case-report.png" alt="Bitbucket Base report example" />
                      </a>
                    </ExampleBox>

                  </Collapser>
                )}
              />
            )
          },
          {
            name: "DVC",
            content: (
              <Switchable
                gitlab={(
                  <Collapser>
                    <Code filename=".gitlab-ci.yml" repo="https://gitlab.com/iterative.ai/cml-dvc-case">
                      <div><span>train-and-report:</span></div>
                      <div>  <span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div>  <span>script:</span></div>
                      <Tooltip type="dvc">
                        <div>    <span>- dvc pull data</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <Tooltip type="dependencies">
                        <div>    <span>- pip install -r requirements.txt</span></div>
                        <div>    <span>- dvc repro</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <Tooltip type="reports">
                        <div>    <span># Compare metrics to main</span></div>
                        <div>    <span>- git fetch --depth=1 origin main:main</span></div>
                        <div>    <span>- dvc metrics diff --show-md main &gt;&gt; report.md</span></div>
                        <div>    <span># Plot training loss function diff</span></div>
                        <div>    <span>- dvc plots diff </span></div>
                        <div>      <span>--target loss.csv --show-vega main &gt; vega.json</span></div>
                        <div>    <span>- vl2png vega.json &gt; plot.png</span></div>
                        <div>    <span>- echo &#x27;![](./plot.png &quot;Training Loss&quot;)&#x27; &gt;&gt; report.md</span></div>
                        <div>    <span># Post CML report as a comment in GitLab</span></div>
                        <div>    <span>- cml comment create report.md</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://gitlab.com/iterative.ai/cml-dvc-case/-/merge_requests/1">
                        <Image src="/img/gitlab/dvc-report.png" alt="GitLab DVC report example" />
                      </a>
                    </ExampleBox>
                  </Collapser>
                )}
                github={(
                  <Collapser>
                    <Code filename=".github/workflows/cml.yaml" repo="https://github.com/iterative/cml_dvc_case">
                      <div><span>name: CML & DVC</span></div>
                      <div><span>on: [push]</span></div>
                      <div><span>jobs:</span></div>
                      <div>  <span>train-and-report:</span></div>
                      <div>    <span>runs-on: ubuntu-latest</span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v3</span></div>
                      <div>      <span>- uses: actions/setup-python@v4</span></div>
                      <div>        <span>with:</span></div>
                      <div>          <span>python-version: &apos;3.x&apos;</span></div>
                      <div>      <span>- uses: iterative/setup-cml@v1</span></div>
                      <Tooltip type="dvc">
                        <div>      <span>- uses: iterative/setup-dvc@v1</span></div>
                        <div>      <span>- name: Train model</span></div>
                        <div>        <span>env:</span></div>
                        <div>          <span>AWS_ACCESS_KEY_ID: {"${{ secrets.AWS_ACCESS_KEY_ID }}"}</span></div>
                        <div>          <span>AWS_SECRET_ACCESS_KEY: {"${{ secrets.AWS_SECRET_ACCESS_KEY }}"}</span></div>
                        <div>        <span>run: |</span></div>
                        <div>          <span>dvc pull data</span></div>
                      </Tooltip>
                      <Tooltip type="dependencies">
                        <div>          <span>pip install -r requirements.txt</span></div>
                        <div>          <span>dvc repro</span></div>
                      </Tooltip>
                      <div>      <span>- name: Create CML report</span></div>
                      <div>        <span>run: |</span></div>
                      <Tooltip type="reports">
                        <div>          <span># Compare metrics to main</span></div>
                        <div>          <span>git fetch --depth=1 origin main:main </span></div>
                        <div>          <span>dvc metrics diff --show-md main &gt;&gt; report.md</span></div>
                        <div>          <span># Plot training loss function diff</span></div>
                        <div>          <span>dvc plots diff \</span></div>
                        <div>            <span>--target loss.csv --show-vega main &gt; vega.json</span></div>
                        <div>          <span>vl2png vega.json &gt; plot.png</span></div>
                        <div>          <span>echo &#x27;![](./plot.png &quot;Training Loss&quot;)&#x27; &gt;&gt; report.md</span></div>
                        <div>          <span>cml comment create report.md</span></div>
                        <div>        <span>env:</span></div>
                        <div>          <span>REPO_TOKEN: {"${{ secrets.GITHUB_TOKEN }}"}</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://github.com/iterative/cml_dvc_case/pull/4">
                        <Image src="/img/github/dvc-report.png" alt="GitHub DVC report example" />
                      </a>
                    </ExampleBox>

                  </Collapser>
                )}
                bitbucket={(
                  <Collapser>
                    <Code filename="bitbucket-pipelines.yml" repo="https://bitbucket.org/iterative-ai/cml-dvc-case">
                      <div><span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div><span>pipelines:</span></div>
                      <div>  <span>default:</span></div>
                      <div>    <span>- step:</span></div>
                      <div>        <span>name: Train model</span></div>
                      <div>        <span>script: </span></div>
                      <Tooltip type="dvc">
                        <div>          <span>- dvc pull data</span></div>
                      </Tooltip>
                      <div><span>      </span></div>
                      <Tooltip type="dependencies">
                        <div>          <span>- pip install -r requirements.txt</span></div>
                        <div>          <span>- dvc repro</span></div>
                      </Tooltip>
                      <div>    <span>- step:</span></div>
                      <div>        <span>name: Create CML report</span></div>
                      <div>        <span>script: </span></div>
                      <Tooltip type="reports">
                        <div>          <span># Compare metrics to main</span></div>
                        <div>          <span>- git fetch --depth=1 origin main:main</span></div>
                        <div>          <span>- dvc metrics diff --show-md main &gt;&gt; report.md</span></div>
                        <div>          <span># Plot training loss function diff</span></div>
                        <div>          <span>- dvc plots diff </span></div>
                        <div>            <span>--target loss.csv --show-vega main &gt; vega.json</span></div>
                        <div>          <span>- vl2png vega.json &gt; plot.png</span></div>
                        <div>          <span>- echo &#x27;![](./plot.png &quot;Training Loss&quot;)&#x27; &gt;&gt; report.md</span></div>
                        <div>          <span># Post CML report as a comment in Bitbucket</span></div>
                        <div>          <span>- cml comment create report.md</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://bitbucket.org/iterative-ai/cml-dvc-case/pull-requests/1">
                        <Image src="/img/bitbucket/dvc-report.png" alt="Bitbucket DVC report example" />
                      </a>
                    </ExampleBox>

                  </Collapser>
                )}
              />
            )
          },
          {
            name: "Tensorboard",
            content: (
              <Switchable
                gitlab={(
                  <Collapser>
                    <Code filename=".gitlab-ci.yml" repo="https://gitlab.com/iterative.ai/cml-tensorboard-case">
                      <div><span>train-and-report:</span></div>
                      <div>  <span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div>  <span>script:</span></div>
                      <div>    <span>- pip install -r requirements.txt</span></div>
                      <Tooltip type="tensorboard">
                        <div>    <span>- cml tensorboard connect</span></div>
                        <div>      <span>--logdir=./logs</span></div>
                        <div>      <span>--name=&quot;Go to tensorboard&quot;</span></div>
                        <div>      <span>--md &gt;&gt; report.md</span></div>
                      </Tooltip>
                      <Tooltip type="reports">
                        <div>    <span>- cml comment create report.md</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <Tooltip type="dependencies">
                        <div>    <span>- python train.py  # generate ./logs</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://gitlab.com/iterative.ai/cml-tensorboard-case/-/merge_requests/1">
                        <Image src="/img/gitlab/tensorboard-report.png" alt="GitLab Tensorboard report example" />
                      </a>
                    </ExampleBox>
                  </Collapser>
                )}
                github={(
                  <Collapser>
                    <Code filename=".github/workflows/cml.yaml" repo="https://github.com/iterative/cml_tensorboard_case">
                      <div><span>name: CML & TensorBoard</span></div>
                      <div><span>on: [push]</span></div>
                      <div><span>jobs:</span></div>
                      <div>  <span>train-and-report:</span></div>
                      <div>    <span>runs-on: ubuntu-latest</span></div>
                      <div>    <span>container: docker://ghcr.io/iterative/cml:0-dvc2-base1</span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v3</span></div>
                      <div>      <span>- name: Train and Report</span></div>
                      <div>        <span>env:</span></div>
                      <div>          <span>REPO_TOKEN: {"${{ secrets.GITHUB_TOKEN }}"}</span></div>
                      <Tooltip type="tensorboard">
                        <div>          <span>TB_CREDENTIALS: {"${{ secrets.TB_CREDENTIALS }}"}</span></div>
                        <div>        <span>run: |</span></div>
                        <div>          <span>pip install -r requirements.txt</span></div>
                        <div>          <span>cml tensorboard connect \</span></div>
                        <div>            <span>--logdir=./logs \</span></div>
                        <div>            <span>--name=&quot;Go to tensorboard&quot; \</span></div>
                        <div>            <span>--md &gt;&gt; report.md</span></div>
                      </Tooltip>
                      <Tooltip type="reports">
                        <div>          <span>cml comment create report.md</span></div>
                      </Tooltip>
                      <Tooltip type="dependencies">
                        <div>          <span>python train.py  # generate ./logs</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://github.com/iterative/cml_tensorboard_case/pull/3">
                        <Image src="/img/github/tensorboard-report.png" alt="GitHub Tensorboard report example" />
                      </a>
                    </ExampleBox>

                  </Collapser>
                )}
                bitbucket={(
                  <Collapser>
                    <Code filename="bitbucket-pipelines.yml" repo="https://bitbucket.org/iterative-ai/cml-tensorboard-case">
                      <div><span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div><span>pipelines:</span></div>
                      <div>  <span>default:</span></div>
                      <div>    <span>- step:</span></div>
                      <div>        <span>name: Train and Report</span></div>
                      <div>        <span>script: </span></div>
                      <div>          <span>- pip install -r requirements.txt</span></div>
                      <Tooltip type="tensorboard">
                        <div>          <span>- cml tensorboard connect</span></div>
                        <div>            <span>--logdir=./logs</span></div>
                        <div>            <span>--name=&quot;Go to tensorboard&quot;</span></div>
                        <div>            <span>--md &gt;&gt; report.md</span></div>
                      </Tooltip>
                      <Tooltip type="reports">
                        <div>          <span>- cml comment create report.md</span></div>
                      </Tooltip>
                      <div><span>      </span></div>
                      <Tooltip type="dependencies">
                        <div>          <span>- python train.py  # generate ./logs</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://bitbucket.org/iterative-ai/cml-tensorboard-case/pull-requests/1">
                        <Image src="/img/bitbucket/tensorboard-report.png" alt="Bitbucket Tensorboard report example" />
                      </a>
                    </ExampleBox>

                  </Collapser>
                )}
              />
            )
          },
          {
            name: "CML Runner Cloud",
            content: (
              <Switchable
                gitlab={(
                  <Collapser>
                    <Code filename=".gitlab-ci.yml" repo="https://gitlab.com/iterative.ai/cml-runner-example">
                      <div><span>launch-runner:</span></div>
                      <div>  <span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div>  <span>script:</span></div>
                      <Tooltip type="runner">
                        <div>    <span># Supports AWS, Azure, GCP, K8s</span></div>
                        <div>    <span>- cml runner launch</span></div>
                        <div>      <span>--cloud=aws</span></div>
                        <div>      <span>--cloud-region=us-west</span></div>
                        <div>      <span>--cloud-type=m5.2xlarge</span></div>
                        <div>      <span>--cloud-spot</span></div>
                        <div>      <span>--labels=cml-runner</span></div>
                        <div><span>train-and-report:</span></div>
                        <div>  <span>tags: [cml-runner]</span></div>
                      </Tooltip>
                      <div>  <span>needs: [launch-runner]</span></div>
                      <div>  <span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div>  <span>script:</span></div>
                      <Tooltip type="dependencies">
                        <div>    <span>- pip install -r requirements.txt</span></div>
                        <div>    <span>- python train.py  # generate plot.png</span></div>
                      </Tooltip>
                      <Tooltip type="reports">
                        <div>    <span>- echo &quot;## Report from your EC2 instance&quot; &gt;&gt; report.md</span></div>
                        <div>    <span>- cat metrics.txt &gt;&gt; report.md</span></div>
                        <div>    <span>- echo &#x27;![](./plot.png &quot;Confusion Matrix&quot;)&#x27; &gt;&gt; report.md</span></div>
                        <div>    <span>- cml comment create report.md</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://gitlab.com/iterative.ai/cml-runner-example/-/merge_requests/1">
                        <Image src="/img/gitlab/cml-runner-report.png" alt="GitLab Cloud report example" />
                      </a>
                    </ExampleBox>
                  </Collapser>
                )}
                github={(
                  <Collapser>
                    <Code filename=".github/workflows/cml.yaml" repo="https://github.com/iterative/cml-runner-base-case">
                      <div><span>name: CML</span></div>
                      <div><span>on: [push]</span></div>
                      <div><span>jobs:</span></div>
                      <div>  <span>launch-runner:</span></div>
                      <div>    <span>runs-on: ubuntu-latest</span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v3</span></div>
                      <div>      <span>- uses: iterative/setup-cml@v1</span></div>
                      <div>      <span>- name: Deploy runner on AWS EC2</span></div>
                      <div>        <span># Supports AWS, Azure, GCP, K8s</span></div>
                      <div>        <span>env:</span></div>
                      <Tooltip type="runner">
                        <div>          <span>REPO_TOKEN: {"${{ secrets.PERSONAL_ACCESS_TOKEN }}"}</span></div>
                        <div>          <span>AWS_ACCESS_KEY_ID: {"${{ secrets.AWS_ACCESS_KEY_ID }}"}</span></div>
                        <div>          <span>AWS_SECRET_ACCESS_KEY: {"${{ secrets.AWS_SECRET_ACCESS_KEY }}"}</span></div>
                        <div>        <span>run: |</span></div>
                        <div>          <span>cml runner launch \</span></div>
                        <div>          <span>--cloud=aws \</span></div>
                        <div>          <span>--cloud-region=us-west \</span></div>
                        <div>          <span>--cloud-type=m5.2xlarge \</span></div>
                        <div>          <span>--labels=cml-runner</span></div>
                        <div>  <span>train-and-report:</span></div>
                        <div>    <span>runs-on: [self-hosted, cml-runner]</span></div>
                      </Tooltip>
                      <div>    <span>needs: launch-runner</span></div>
                      <div>    <span>timeout-minutes: 50400 # 35 days</span></div>
                      <div>    <span>container: docker://iterativeai/cml:0-dvc2-base1</span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v3</span></div>
                      <div>      <span>- name: Train and Report</span></div>
                      <div>        <span>run: |</span></div>
                      <Tooltip type="dependencies">
                        <div>          <span>pip install -r requirements.txt</span></div>
                        <div>          <span>python train.py  # generate plot.png</span></div>
                      </Tooltip>
                      <Tooltip type="reports">
                        <div>          <span>echo &quot;## Report from your EC2 Instance&quot; &gt;&gt; report.md</span></div>
                        <div>          <span>cat metrics.txt &gt;&gt; report.md</span></div>
                        <div>          <span>echo &#x27;![](./plot.png &quot;Confusion Matrix&quot;)&#x27; &gt;&gt; report.md</span></div>
                        <div>          <span>cml comment create report.md</span></div>
                        <div>        <span>env:</span></div>
                        <div>          <span>REPO_TOKEN: {"${{ secrets.PERSONAL_ACCESS_TOKEN }}"}</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://github.com/iterative/cml-runner-base-case/pull/4">
                        <Image src="/img/github/cml-runner-report.png" alt="GitHub Cloud report example" />
                      </a>
                    </ExampleBox>

                  </Collapser>
                )}
                bitbucket={(
                  <Collapser>
                    <Code filename="bitbucket-pipelines.yml" repo="https://bitbucket.org/iterative-ai/cml-runner-example">
                      <div><span>pipelines:</span></div>
                      <div>  <span>default:</span></div>
                      <div>    <span>- step:</span></div>
                      <div>        <span>name: Launch Runner</span></div>
                      <div>        <span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div>        <span>script:</span></div>
                      <div>          <span># Supports AWS, Azure, GCP, K8s</span></div>
                      <Tooltip type="runner">
                        <div>          <span>- cml runner launch</span></div>
                        <div>                <span>--cloud=aws</span></div>
                        <div>                <span>--cloud-region=us-west</span></div>
                        <div>                <span>--cloud-type=m5.2xlarge</span></div>
                        <div>                <span>--cloud-spot</span></div>
                        <div>                <span>--labels=cml.runner</span></div>
                        <div>    <span>- step:</span></div>
                        <div>        <span>runs-on: [self.hosted, cml.runner]</span></div>
                      </Tooltip>
                      <div>        <span>name: Train and Report</span></div>
                      <div>        <span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div>        <span>script:</span></div>
                      <Tooltip type="dependencies">
                        <div>          <span>- pip install -r requirements.txt</span></div>
                        <div>          <span>- python train.py  # generate plot.png</span></div>
                      </Tooltip>
                      <Tooltip type="reports">
                        <div>          <span>- echo &quot;## Report from your EC2 instance&quot; &gt;&gt; report.md</span></div>
                        <div>          <span>- cat metrics.txt &gt;&gt; report.md</span></div>
                        <div>          <span>- echo &#x27;![](./plot.png &quot;Confusion Matrix&quot;)&#x27; &gt;&gt; report.md</span></div>
                        <div>          <span>- cml comment create report.md</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://bitbucket.org/iterative-ai/cml-runner-example/pull-requests/1">
                        <Image src="/img/bitbucket/cml-runner-report.png" alt="Bitbucket Cloud report example" />
                      </a>
                    </ExampleBox>

                  </Collapser>
                )}
              />
            )
          },
          {
            name: "Runner Cloud GPU",
            content: (
              <Switchable
                gitlab={(
                  <Collapser>
                    <Code filename=".gitlab-ci.yml" repo="https://gitlab.com/iterative.ai/cml-cloud-case">
                      <div><span>launch-runner:</span></div>
                      <div>  <span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div>  <span>script:</span></div>
                      <Tooltip type="runner">
                        <div>    <span># Supports AWS, Azure, GCP, K8s</span></div>
                        <div>    <span>- cml runner launch</span></div>
                        <div>      <span>--cloud=aws</span></div>
                        <div>      <span>--cloud-region=us-west</span></div>
                        <div>      <span>--cloud-type=p2.xlarge</span></div>
                        <div>      <span>--cloud-hdd-size=64</span></div>
                        <div>      <span>--cloud-spot</span></div>
                        <div>      <span>--labels=cml-gpu</span></div>
                        <div><span>train-and-report:</span></div>
                        <div>  <span>tags: [cml-gpu]</span></div>
                      </Tooltip>
                      <div>  <span>needs: [launch-runner]</span></div>
                      <div>  <span>image: iterativeai/cml:0-dvc2-base1-gpu</span></div>
                      <div>  <span>script:</span></div>
                      <Tooltip type="dvc">
                        <div>    <span>- dvc pull data</span></div>
                      </Tooltip>
                      <Tooltip type="dependencies">
                        <div>    <span>- pip install -r requirements.txt</span></div>
                        <div>    <span>- dvc repro</span></div>
                      </Tooltip>
                      <Tooltip type="reports">
                        <div>    <span>- git show origin/main:image.png &gt; image-main.png</span></div>
                        <div>    <span>- |</span></div>
                        <div>    <span>  cat &lt;&lt;EOF &gt; report.md</span></div>
                        <div>    <span>  # Style transfer</span></div>
                        <div>    <span>  ## Workspace vs. Main</span></div>
                        <div>    <span>  ![](./image.png &quot;Workspace&quot;) ![](./image-main.png &quot;Main&quot;)</span></div>
                        <div>    <span>  ## Training metrics</span></div>
                        <div>    <span>  $(dvc params diff main --show-md)</span></div>
                        <div>    <span>  ## GPU info</span></div>
                        <div>    <span>  $(cat gpu_info.txt)</span></div>
                        <div>    <span>  EOF</span></div>
                        <div>    <span>- cml comment create report.md</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://gitlab.com/iterative.ai/cml-cloud-case/-/merge_requests/1">
                        <Image src="/img/gitlab/cloud-report.png" alt="GitLab Cloud report example" />
                      </a>
                    </ExampleBox>
                  </Collapser>
                )}
                github={(
                  <Collapser>
                    <Code filename=".github/workflows/cml.yaml" repo="https://github.com/iterative/cml_cloud_case">
                      <div><span>name: CML</span></div>
                      <div><span>on: [push]</span></div>
                      <div><span>jobs:</span></div>
                      <div>  <span>launch-runner:</span></div>
                      <div>    <span>runs-on: ubuntu-latest</span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v3</span></div>
                      <div>      <span>- uses: iterative/setup-cml@v1</span></div>
                      <div>      <span>- name: Deploy runner on AWS EC2</span></div>
                      <div>        <span># Supports AWS, Azure, GCP, K8s</span></div>
                      <div>        <span>env:</span></div>
                      <Tooltip type="runner">
                        <div>          <span>REPO_TOKEN: {"${{ secrets.PERSONAL_ACCESS_TOKEN }}"}</span></div>
                        <div>          <span>AWS_ACCESS_KEY_ID: {"${{ secrets.AWS_ACCESS_KEY_ID }}"}</span></div>
                        <div>          <span>AWS_SECRET_ACCESS_KEY: {"${{ secrets.AWS_SECRET_ACCESS_KEY }}"}</span></div>
                        <div>        <span>run: |</span></div>
                        <div>          <span>cml runner launch \</span></div>
                        <div>          <span>--cloud=aws \</span></div>
                        <div>          <span>--cloud-region=us-west \</span></div>
                        <div>          <span>--cloud-type=p2.xlarge \</span></div>
                        <div>          <span>--cloud-hdd-size=64 \</span></div>
                        <div>          <span>--labels=cml-gpu</span></div>
                        <div>  <span>train-and-report:</span></div>
                        <div>    <span>runs-on: [self-hosted, cml-gpu]</span></div>
                      </Tooltip>
                      <div>    <span>needs: launch-runner</span></div>
                      <div>    <span>timeout-minutes: 50400 # 35 days</span></div>
                      <div>    <span>container:</span></div>
                      <div>      <span>image: docker://iterativeai/cml:0-dvc2-base1-gpu</span></div>
                      <div>      <span>options: --gpus all</span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v3</span></div>
                      <div>      <span>- name: Train model</span></div>
                      <div>        <span>run: |</span></div>
                      <Tooltip type="dvc">
                        <div>          <span>dvc pull data</span></div>
                      </Tooltip>
                      <Tooltip type="dependencies">
                        <div>          <span>pip install -r requirements.txt</span></div>
                        <div>          <span>dvc repro</span></div>
                      </Tooltip>
                      <div>      <span>- name: Create CML report</span></div>
                      <div>        <span>run: |</span></div>
                      <Tooltip type="reports">
                        <div>          <span>git show origin/main:image.png &gt; image-main.png</span></div>
                        <div>          <span>cat &lt;&lt;EOF &gt; report.md</span></div>
                        <div>          <span># Style transfer</span></div>
                        <div>          <span>## Workspace vs. Main</span></div>
                        <div>          <span>![](./image.png &quot;Workspace&quot;) ![](./image-main.png &quot;Main&quot;)</span></div>
                        <div>          <span>## Training metrics</span></div>
                        <div>          <span>$(dvc params diff main --show-md)</span></div>
                        <div>          <span>## GPU info</span></div>
                        <div>          <span>$(cat gpu_info.txt)</span></div>
                        <div>          <span>EOF</span></div>
                        <div>          <span>cml comment create report.md</span></div>
                        <div>        <span>env:</span></div>
                        <div>          <span>REPO_TOKEN: {"${{ secrets.PERSONAL_ACCESS_TOKEN }}"}</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://github.com/iterative/cml_cloud_case/pull/11">
                        <Image src="/img/github/cloud-report.png" alt="GitHub Cloud report example" />
                      </a>
                    </ExampleBox>

                  </Collapser>
                )}
                bitbucket={(
                  <Collapser>
                    <Code filename="bitbucket-pipelines.yml" repo="https://bitbucket.org/iterative-ai/cml-cloud-case">
                      <div><span># Use LEO instead of CML to force GPU support on Bitbucket</span></div>
                      <div><span># (<a href="/doc/ref/runner#bitbucket">https://cml.dev/doc/ref/runner#bitbucket</a>)</span></div>
                      <div><span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div><span>pipelines:</span></div>
                      <div>  <span>default:</span></div>
                      <div>    <span>- step:</span></div>
                      <div>        <span>name: Launch Runner and Train</span></div>
                      <div>        <span>script:</span></div>
                      <div>          <span>- |</span></div>
                      <div>            <span>cat &lt;&lt;EOF &gt; leo-script.sh</span></div>
                      <div>            <span>#!/bin/bash</span></div>
                      <div>            <span>apt-get update -q && apt-get install -yq python3.9</span></div>
                      <Tooltip type="dvc">
                      <div>            <span>dvc pull data</span></div>
                      </Tooltip>
                      <Tooltip type="dependencies">
                      <div>            <span>pip3 install -r requirements.txt</span></div>
                      <div>            <span>dvc repro</span></div>
                      </Tooltip>
                      <div>            <span>EOF</span></div>
                      <Tooltip type="runner">
                      <div>          <span>- |</span></div>
                      <div>            <span>LEO_OPTIONS=&quot;--cloud=aws --region=us-west&quot;</span></div>
                      <div>            <span>leo_id=$(leo create $LEO_OPTIONS \</span></div>
                      <div>              <span>--image=&quot;nvidia&quot;</span></div>
                      <div>              <span>--machine=&quot;p2.xlarge&quot; \</span></div>
                      <div>              <span>--disk-size=64 \</span></div>
                      <div>              <span>--workdir=&quot;.&quot; \</span></div>
                      <div>              <span>--output=&quot;.&quot; \</span></div>
                      <div>              <span>--environment AWS_ACCESS_KEY_ID=&quot;$AWS_ACCESS_KEY_ID&quot; \</span></div>
                      <div>              <span>--environment AWS_SECRET_ACCESS_KEY=&quot;$AWS_SECRET_ACCESS_KEY&quot; \</span></div>
                      <div>              <span>--script=&quot;$(cat ./leo-script.sh)&quot;</span></div>
                      <div>            <span>)</span></div>
                      <div>            <span>leo read $LEO_OPTIONS --follow &quot;$leo_id&quot;</span></div>
                      <div>            <span>sleep 45 # TODO: explain</span></div>
                      <div>            <span>leo delete $LEO_OPTIONS --workdir=&quot;.&quot; --output=&quot;.&quot; \</span></div>
                      <div>              <span>&quot;$leo_id&quot;</span></div>
                      </Tooltip>
                      <Tooltip type="reports">
                      <div>          <span>- git show origin/main:image.png &gt; image-main.png</span></div>
                      <div>          <span>- |</span></div>
                      <div>            <span>cat &lt;&lt;EOF &gt; report.md</span></div>
                      <div>            <span># Style transfer</span></div>
                      <div>            <span>## Workspace vs. Main</span></div>
                      <div>            <span>![](./image.png &quot;Workspace&quot;) ![](./image-main.png &quot;Main&quot;)</span></div>
                      <div>            <span>## Training metrics</span></div>
                      <div>            <span>$(dvc params diff main --show-md)</span></div>
                      <div>            <span>## GPU info</span></div>
                      <div>            <span>$(cat gpu_info.txt)</span></div>
                      <div>            <span>EOF</span></div>
                      <div>          <span>- cml comment create report.md</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://bitbucket.org/iterative-ai/cml-cloud-case/pull-requests/1">
                        <Image src="/img/bitbucket/cloud-report.png" alt="Bitbucket Cloud report example" />
                      </a>
                    </ExampleBox>
                  </Collapser>
                )}
              />
            )
          }
        ]} />

    </FullWidthBox>
  </section>
)

export default forwardRef<HTMLElement>(UseCasesSection)
