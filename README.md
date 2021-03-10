# PoC - Apollo smart query.

This repo is a PoC that allows you to handle local state management using Apollo Graphql resolvers.

## The gist

In [the resolvers.ts file](https://github.com/nadav-dav/apollo-smart-query/blob/main/src/resolvers.ts) you can see how to create a watched variable, much like Apollo had created in version 3. But unlike the new version, my system is using the regular local resolvers and not the `typePolicies` of the cache (the api there is really uncomfortable...).

## Hooks
Using the query hooks is exactly like Apollo's `useQuery`, but instead, I use `useSmartQuery` .
Check it out in [Display.tsx](https://github.com/nadav-dav/apollo-smart-query/blob/main/src/Display.tsx).

Any questions? Please feel free to discuess it here :)

Nadav
