import { useEffect, useState } from 'react';
import { ProgramMetadata } from '@gear-js/api';
import { Buffer } from 'buffer';
import { useAlert } from '@gear-js/react-hooks';
import { Metadata } from '@polkadot/types';

type Program = {
  buffer: Buffer;
  meta: Metadata;
};

export const useMetadata = (source: RequestInfo | URL) => {
  const [data, setData] = useState<ProgramMetadata>();

  useEffect(() => {
    fetch(source)
      .then((res) => res.text() as Promise<string>)
      .then((raw) => ProgramMetadata.from(`0x${raw}`))
      .then((meta) => setData(meta));
  }, [source]);

  return { metadata: data };
};
