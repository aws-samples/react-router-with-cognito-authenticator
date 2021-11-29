# React Router with Amplify Authenticator

This example shows how to implements with Authenticator to provide a role based navigation guard with react-router. This example has 3 pages with different visibilities.

| path             | visibility                               |
| ---------------- | ---------------------------------------- |
| /public          | Any user                                 |
| /protected       | Signed in user                           |
| /protected/admin | Users belong to 'admin' group in Cognito |

## How to use

### 1. Deploy Amazon Cognito

Move to `cdk` directory and run the following commands

```sh
npm run cdk bootstrap
npm run cdk deploy
```

Note `CdkStack.OutputUserPool` and `CdkStack.OutputUserPoolClientId` shown in the terminal when succeeded.

### 2. Create admin user

```sh
aws cognito-idp admin-create-user \
    --user-pool-id "us-west-2_piFBtkKuc" \
    --username "admin" \
    --user-attributes Name=email,Value="tsukuitt+admin@amazon.co.jp" Name=email_verified,Value=true \
    --message-action SUPPRESS
```

Replace <UserPool ID> with `OuutputUserPoolId`. You can also confirm this on AWS Management Conaole.

Confirm the password for the above user with the foloowing command.

```sh
aws cognito-idp admin-set-user-password \
    --user-pool-id us-west-2_piFBtkKuc \
    --username admin \
    --password Passw0rd! \
    --permanent
```

Add the user to `admin` group.

```sh
aws cognito-idp admin-add-user-to-group \
    --user-pool-id us-west-2_piFBtkKuc \
    --username admin \
    --group-name admin
```

### 3. Run React App

Move to `app` directory.

```sh
cp .env .env.local
```

Edit `.env.local` to set Cognito information.

```
REACT_APP_AUTH_USER_POOL_ID=<CdkStack.OutputUserPool>
REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID=<CdkStack.OutputUserPoolClientId>
```

Run locally.

```sh
npm i
npm run start
```

`Public Page` is available for any users. When click `Protected Page` link, you are prompted to Sign in. After the atuthentification process, you can see `Protected Page`. If the user belongs to `admin` group, `Admin` link and `User` link appears. If not, only `User` link appears.

## Clean up

To avoid incurring future charges, clean up the resources you created.

You can remove all the AWS resources deployed by this sample running the following command:

```sh
npm run cdk destroy --force
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
