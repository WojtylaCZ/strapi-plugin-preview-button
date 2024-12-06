import get from 'lodash/get';
import { type UID } from '@strapi/strapi';

import { ListViewColumn } from '../components';
import { PLUGIN_ID } from '../constants';

export interface AddPreviewColumnProps {
  displayedHeaders: {
    key: string;
    fieldSchema: {
      type: string;
    };
    metadatas: {
      label: string;
      searchable: boolean;
      sortable: boolean;
    };
    name: string;
    cellFormatter: (data: any) => React.ReactElement;
  }[];
  layout: {
    contentType: {
      uid: UID.ContentType | undefined;
      options: {
        draftAndPublish: boolean;
      };
      pluginOptions: {
        [pluginId: string]: {
          listViewColumn: boolean;
        };
      };
    };
  };
}

const addPreviewColumn = ({ displayedHeaders, layout }: AddPreviewColumnProps) => {
  const supportKeys = ['contentType', 'pluginOptions', PLUGIN_ID, 'listViewColumn'];
  const isSupported = get(layout, supportKeys, false) === true;

  // Do nothing if the preview button column is not supported or disabled for this UID.
  if (!isSupported) {
    return {
      displayedHeaders,
      layout,
    };
  }

  return {
    displayedHeaders: [
      ...displayedHeaders,
      {
        key: '__preview_key__',
        fieldSchema: {
          type: 'string',
        },
        metadatas: {
          label: 'Preview',
          searchable: false,
          sortable: false,
        },
        name: 'preview',
        cellFormatter: (data: any) => <ListViewColumn data={data} layout={layout} />,
      },
    ],
    layout,
  };
};

export default addPreviewColumn;
