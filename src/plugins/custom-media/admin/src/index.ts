
import { MediaLibraryInput } from './components/MediaLibraryInput/MediaLibraryInput';
import { pluginId } from './pluginId';
import { prefixPluginTranslations } from './utils';

import type { MediaLibraryInputProps } from './components/MediaLibraryInput/MediaLibraryInput';
import type { StrapiApp } from '@strapi/admin/strapi-admin';
import type { Plugin } from '@strapi/types';

const admin: Plugin.Config.AdminInput = {
  register(app: StrapiApp) {
    app.addFields({
      type: 'media',
      Component: MediaLibraryInput as React.FC<Partial<MediaLibraryInputProps>>,
    });

    // app.registerPlugin({
    //   id: pluginId,
    //   name,
    // });
  },
  async registerTrads({ locales }: { locales: string[] }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};

// eslint-disable-next-line import/no-default-export
export default admin;
