import EventEmitter from 'eventemitter3';
import { DocumentNode } from 'graphql';
import {
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  useQuery,
  TypedDocumentNode,
} from '@apollo/client';
import { useEffect, useState } from 'react';

type Context = {
  context: string;
};

class Var<T> {
  key: string = Math.round(Math.random() * 1000000000000000).toString(16);
}

const values: any = {};

const emitter = new EventEmitter();

const listeners: Record<string, Set<string>> = {};

export function createVar<T>(defaultValue: T): Var<T> {
  const v = new Var<T>();
  values[v.key] = defaultValue;
  return v;
}

function onChange(ctx: Context, fn: () => any) {
  emitter.on(ctx.context, fn);
}

function removeListeners(ctx: Context) {
  emitter.removeAllListeners(ctx.context);
}

function createReader(ctx: Context) {
  return function read<T>(v: Var<T>) {
    if (!listeners[v.key]) listeners[v.key] = new Set<string>();
    listeners[v.key].add(ctx.context);
    return values[v.key];
  };
}

export function read<T>(v: Var<T>): T {
  return values[v.key];
}

export function write<T>(v: Var<T>, value: T) {
  values[v.key] = value;
  if (listeners[v.key]) {
    listeners[v.key].forEach((ctx) => emitter.emit(ctx));
  }
}

export function useSmartQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>,
): QueryResult<TData, TVariables> {
  const [id] = useState<string>(Math.random().toString(16));
  const [data, setData] = useState<any>();
  const read = createReader({ context: id });
  useEffect(() => {
    onChange({ context: id }, async () => {
      const queryOnlyClient: DocumentNode = {
        ...query,
        definitions: query.definitions.map((def) => {
          if ('selectionSet' in def) {
            return {
              ...def,
              selectionSet: {
                ...def.selectionSet,
                selections: def.selectionSet.selections.filter((selection) => {
                  return selection.directives?.find(
                    (directive) => directive.name.value === 'client',
                  );
                }),
              },
            };
          } else {
            return def;
          }
        }),
      };

      const newData = await client.query({
        query: queryOnlyClient,
        fetchPolicy: 'network-only',
        context: { read },
      });

      setData(Object.assign({}, data, newData.data));
    });
    return () => {
      removeListeners({ context: id });
    };
  }, []);

  const { data: queryData, client, ...rest } = useQuery(query, {
    ...options,
    context: {
      ...options?.context,
      read: read,
    },
    onCompleted: (data) => {
      setData(data);
      if (options?.onCompleted) {
        options.onCompleted(data);
      }
    },
  });
  return { data, client, ...rest };
}
