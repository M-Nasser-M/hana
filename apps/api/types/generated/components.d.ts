import type { Schema, Attribute } from '@strapi/strapi';

export interface SharedColors extends Schema.Component {
  collectionName: 'components_shared_colors';
  info: {
    displayName: 'colors';
  };
  attributes: {
    color: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
  };
}

export interface SharedLabelNote extends Schema.Component {
  collectionName: 'components_shared_label_notes';
  info: {
    displayName: 'label-note';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    note: Attribute.String;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedSeller extends Schema.Component {
  collectionName: 'components_shared_sellers';
  info: {
    displayName: 'seller';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    info: Attribute.RichText;
    avatar: Attribute.Media;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media & Attribute.Required;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.colors': SharedColors;
      'shared.label-note': SharedLabelNote;
      'shared.meta-social': SharedMetaSocial;
      'shared.seller': SharedSeller;
      'shared.seo': SharedSeo;
    }
  }
}
