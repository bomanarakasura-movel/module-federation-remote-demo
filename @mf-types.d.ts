
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER/CounterWidget';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER/CounterWidget' ? typeof import('REMOTE_ALIAS_IDENTIFIER/CounterWidget') :any;