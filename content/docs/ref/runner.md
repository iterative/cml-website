# Command Reference: `runner`

```usage
cml runner launch [options]
```

Starts a [runner](/doc/self-hosted-runners) (either via any supported cloud
compute provider or locally on-premise).

## Options

Any [generic option](/doc/ref) in addition to:

- `--labels=<...>`: One or more (comma-delimited) labels for this runner
  [default: `cml`].
- `--name=<...>`: Runner name displayed in the CI [default: `cml-{ID}`].
- `--idle-timeout=<seconds>`: Seconds to wait for jobs before terminating. Set
  to `-1` to disable timeout [default: `300`].
- `--no-retry`: Don't restart the workflow when terminated due to instance
  disposal or
  [GitHub Actions timeout](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners#usage-limits).
- `--single`: Terminate runner after one workflow run.
- `--reuse`: Don't launch a new runner if an existing one has the same name or
  overlapping labels. If an existing matching (same name or overlapping labels)
  instance is busy, it'll
  [still be reused](https://github.com/iterative/cml/issues/610).
- `--reuse-idle`: Creates a new runner only if the matching labels don't exist
  or are already busy.
- `--cloud={aws,azure,gcp,kubernetes}`: Cloud compute provider to host the
  runner.
- `--cloud-type={m,l,xl,m+k80,m+v100,...}`: Instance
  [type](https://registry.terraform.io/providers/iterative/iterative/latest/docs/resources/task#machine-type).
  Also accepts native types such as `t2.micro`.
- `--cloud-gpu={nogpu,k80,v100,tesla}`: GPU type.
- `--cloud-hdd-size=<...>`: Disk storage in GB.
- `--cloud-spot`: Request a preemptible spot instance.
- `--cloud-spot-price=<...>`: Maximum spot instance USD bidding price, [default:
  *current price*].
- `--cloud-region={us-west,us-east,eu-west,eu-north,...}`:
  [Region](https://registry.terraform.io/providers/iterative/iterative/latest/docs/resources/task#cloud-regions)
  where the instance is deployed. Also accepts native AWS/Azure region or GCP
  zone [default: `us-west`].
- `--cloud-permission-set=<...>`:
  [AWS instance profile](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#ec2-instance-profile)
  or
  [GCP instance service account](https://cloud.google.com/compute/docs/access/service-accounts).
  More [details below](#using---cloud-permission-set).
- `--cloud-metadata=<...>`: `key=value` pair to associate with cloud runner
  instances. May be [specified multiple times](http://yargs.js.org/docs/#array).
- `--cloud-startup-script=<...>`: Run the provided
  [Base64](https://linux.die.net/man/1/base64)-encoded Linux shell script during
  the instance initialization. More
  [details below](#using---cloud-startup-script).
- `--cloud-ssh-private=<key>`: Private SSH RSA key [default: *auto-generate
  throwaway key*]. Only supported on AWS and Azure; intended for debugging
  purposes. More [details below](#using---cloud-ssh-private).
- `--cloud-aws-security-group=<...>`:
  [AWS security group](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
  identifier.
- `--cloud-aws-subnet=<...>`:
  [AWS subnet](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html#subnet-basics)
  identifier.
- `--cloud-kubernetes-node-selector=<...>`: `key=value` pair to specify the
  Kubernetes node selector. May be
  [specified multiple times](http://yargs.js.org/docs/#array). More
  [details below](#using---cloud-kubernetes-node-selector). [default:
  `accelerator=infer`]
- `--docker-volumes=<...>`: Volume mount to pass to Docker, e.g.
  `/var/run/docker.sock:/var/run/docker.sock` for Docker-in-Docker support. May
  be specified multiple times. Only supported by GitLab.

## FAQs and Known Issues

### GitHub

- **GitHub Actions timeout after a few hours**.

  You can request up to
  [35 days](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners#usage-limits)
  via
  [`timeout-minutes: 50400`](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idtimeout-minutes).
  CML will helpfully restart GitHub Actions workflows approaching 35 days (you'd
  need to write your code to save intermediate results to take advantage of
  this).

### Bitbucket

- **GPU support**.

  See
  [the guide on self-hosted Bitbucket runners](/doc/self-hosted-runners?tab=Bitbucket-GPU)
  to work around
  [Bitbucket's lack of native GPU support](https://jira.atlassian.com/browse/BCLOUD-21459).

## Examples

### Using `--cloud-permission-set`

#### Format

<admon type="info">

The associated cloud credentials must grant access to resources needed for
managing compute instances.

</admon>

<toggle>
<tab title="AWS">

An AWS ARN to an instance-profile:

- `arn:aws:iam::1234567890:instance-profile/dvc-s3-access`

```cli
$ cml runner launch \
  --cloud-permission-set=arn:aws:iam::1234567890:instance-profile/dvc-s3-access \
  ...
```

</tab>
<tab title="GCP">

A GCP service account email &
[list of scopes](https://cloud.google.com/sdk/gcloud/reference/alpha/compute/instances/set-scopes#--scopes):

- `my-sa@myproject.iam.gserviceaccount.com,scopes=storage-rw,datastore`
- `my-sa@myproject.iam.gserviceaccount.com,scopes=storage-rw`

```cli
$ cml runner launch \
  --cloud-permission-set=my-sa@myproject.iam.gserviceaccount.com,scopes=storage-rw,datastore \
  ...
```

</tab>
</toggle>

#### Common Permissions

<admon type="tip">

It's recommended to use provider-managed policies/roles and then explicitly
limit the permissions further if possible.

</admon>

<toggle>
<tab title="AWS">

- AWS Managed Policy:
  [`arn:aws:iam::aws:policy/AmazonEC2FullAccess`](https://us-east-1.console.aws.amazon.com/iam/home#/policies/arn:aws:iam::aws:policy/AmazonEC2FullAccess$serviceLevelSummary)

**For example** this could potentially be further limited to:

```
ec2:CreateSecurityGroup -- (Firewall and SSH Access Management)
ec2:AuthorizeSecurityGroupEgress
ec2:AuthorizeSecurityGroupIngress
ec2:DescribeSecurityGroups
ec2:DescribeSubnets
ec2:DescribeVpcs
ec2:DescribeInstanceTypeOfferings
ec2:ImportKeyPair
ec2:DeleteKeyPair
ec2:CreateTags -- (General Resource Management)
ec2:RunInstances -- (EC2 Instance Management)
ec2:DescribeImages
ec2:DescribeInstances
ec2:TerminateInstances
ec2:DescribeSpotInstanceRequests -- (Optionally needed for Spot Access)
ec2:RequestSpotInstances
ec2:CancelSpotInstanceRequests
```

</tab>
<tab title="GCP">

[GCP Managed Roles](https://cloud.google.com/iam/docs/understanding-roles#compute-engine-roles):

- `roles/compute.admin`
- `roles/iam.serviceAccountUser`

**For example** this could potentially be further limited to:

```
compute.diskTypes.get
compute.disks.create
compute.firewalls.create
compute.firewalls.delete
compute.globalOperations.get
compute.instances.create
compute.instances.delete
compute.instances.get
compute.instances.list
compute.instances.setMetadata
compute.instances.setServiceAccount
compute.instances.setTags
compute.machineTypes.get
compute.networks.create
compute.networks.get
compute.networks.updatePolicy
compute.subnetworks.use
compute.subnetworks.useExternalIp
compute.zoneOperations.get
compute.zones.get
compute.zones.list
iam.serviceAccounts.actAs
```

</tab>
</toggle>

You may also require additional permissions specific to your application (for
example: object storage, private docker registries, and other cloud services).
These additional permissions should be managed separately, and exposed either as
independent credentials or via
[`--cloud-permission-set`](https://cml.dev/doc/ref/runner#--cloud-permission-set)

<admon type="info">

Currently this feature is only available on AWS & GCP clouds.

</admon>

A set of permissions for a `cml runner` instance can be predefined a via an
[AWS role](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html)
or a
[GCP service account](https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances).

This could, for example, enable credential-free access to AWS `s3` & GCP `gs`
[DVC](https://dvc.org) remotes, or grant access to AWS'
[Elastic Container Registry](https://aws.amazon.com/ecr/) & GCP's
[Artifact Registry](https://cloud.google.com/artifact-registry/) (to push and
pull custom docker images).

Other AWS examples include accessing data in:

- Secrets Manager
- DynamoDB
- Redshfit

#### Example "Permission Sets"

<toggle>
<tab title="AWS">
Policy example:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DVCAccess",
      "Action": "s3:*",
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::mydvcbucket/*"
    }
  ]
}
```

Trust relationships:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CMLRunnerInstance",
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

</tab>
<tab title="GCP">

<admon type="info">

Using `--cloud-permission-set` will likely require:

- an additional role be added to your `cml runner` credentials
  `roles/ServiceAccountUser`,
- ensuring the invoker has the permission `iam.serviceAccount.actAs` on the
  targeted Service Account.

</admon>

</tab>
</toggle>

### Using `--cloud-startup-script`

A [base64-encoded](https://en.wikipedia.org/wiki/Base64) script to execute
during cloud instance provisioning (after `cml runner` does its initial setup
but before the runner becomes available to the CI/CD provider).

<admon type="warn">

This script counts towards the total provisioning time. The total exceeding 10
minutes is considered a failure, resulting in `cml runner` terminating the
instance and exiting with an error.

</admon>

For example:

```cli
$ cml runner launch \
  --cloud-startup-script=IyEvYmluL2Jhc2gKCmVjaG8gImhlbGxvIHdvcmxkIgo= \
  ...
```

where `echo IyEvYmluL2Jhc2gKCmVjaG8gImhlbGxvIHdvcmxkIgo= | base64 -d` is:

```bash
#!/bin/bash

echo "hello world"
```

This can be used for debugging, for example allowing SSH access for a GitHub
user:

```cli
$ cml runner launch \
  --cloud-startup-script=$(echo 'curl https://github.com/${{ github.actor }}.keys >> /home/ubuntu/.ssh/authorized_keys' | base64 -w 0) \
  ...
```

<admon type="info">

GitHub Actions will
[replace `${{ github.actor }}` with the username of the person who triggered the workflow](https://docs.github.com/en/actions/learn-github-actions/contexts#github-context).
Conveniently, GitHub (and GitLab) provide a URL to access a user's public SSH
keys. In effect the above command runs:

```cli
$ curl https://github.com/YOUR_USERNAME.keys >> ~/.ssh/authorized_keys
```

in the cloud instance.

</admon>

This enables easy SSH access into the runner for debugging as well as
experimentation.

<admon type="info">

By comparison,
[`--cloud-ssh-private`](https://cml.dev/doc/ref/runner#--cloud-ssh-private)
relies on a local user-generated _private_ key and is only supported on AWS and
Azure.

</admon>

### Using `--cloud-ssh-private`

1. Generate a new RSA PEM private key for debugging purposes:

   ```cli
   $ ssh-keygen -t rsa -m pem -b 4096 -f key.pem
   ```

2. Pass the contents of the generated private key file when invoking the
   `cml runner` command:

   ```cli
   $ cml runner launch --cloud=... --cloud-ssh-private="$(cat key.pem)"
   ```

3. Access the instance from your local system by using the generated key as an
   identity file:

   ```cli
   $ ssh -i key.pem ubuntu@IP_ADDRESS
   ```

   replacing the `IP_ADDRESS` placeholder with the instance address returned by
   `cml runner` (search the output logs for `instanceIp`).

### Using `--cloud-kubernetes-node-selector`

Set the
[Kubernetes node selector](https://kubernetes.io/docs/tasks/configure-pod-container/assign-pods-nodes/).

For example:

```cli
$ cml runner launch \
  --cloud-kubernetes-node-selector="disktype=ssd" \
  ...
```

will select the node labeled with `disktype=ssd`.

If not provided, a default `accelerator=infer` key pair will be used.

#### Node selector on multiple labels

You can set multiple labels for a node selector.

For example:

```cli
$ cml runner launch \
  --cloud-kubernetes-node-selector="disktype=ssd" \
  --cloud-kubernetes-node-selector="ram=huge" \
  ...
```

will select the node labeled with `disktype=ssd` and `ram=huge`.

If you specify the same key multiple times, the last one will be used.

#### Infer the value from the GPU configuration

If you set the key value to `infer`, it will infer the GPU type from the GPU
configuration on the key you have set.

For example:

```cli
$ cml runner launch \
  --cloud-kubernetes-node-selector="gpu=infer" \
  ...
```

will select the node labeled `gpu` with the value inferred from the GPU
configuration if available, e.g. `k80`.

## Debugging

[See the section self-hosted runners](/doc/self-hosted-runners#debugging)
