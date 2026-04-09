
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Service } from '../../types';
import {
  SERVICES,
  PRODUCTS,
  ABOUT_SECTION_CONTENT,
  CONTACT_EMAILS,
  CONTACT_OFFICES,
  GALLERY_CONTENT,
  STATS,
  TEAM,
  NAV_LINKS,
} from '../../constants';

// 1. SERVICES
export const useTranslatedServices = () => {
  const { t, i18n } = useTranslation();

  return useMemo((): Service[] => SERVICES.map((s) => ({
    ...s,
    title: t(`services.${s.id}.title`, { defaultValue: s.title }),
    shortTitle: t(`services.${s.id}.shortTitle`, { defaultValue: s.shortTitle || '' }),
    description: t(`services.${s.id}.desc`, { defaultValue: s.description }),
    features: s.features.map((f, i) =>
      t(`services.${s.id}.features.${i}`, { defaultValue: f })
    ),
    details: {
      ...s.details,
      intro: t(`services.${s.id}.intro`, { defaultValue: s.details.intro }),
      downloadText: s.details.downloadText
        ? t(`services.${s.id}.downloadText`, { defaultValue: s.details.downloadText })
        : undefined,
      sections: s.details.sections?.map((section, si) => ({
        ...section,
        heading: t(`services.${s.id}.sections.${si}.heading`, { defaultValue: section.heading }),
        body: Array.isArray(section.body)
          ? section.body.map((b, bi) =>
              t(`services.${s.id}.sections.${si}.body.${bi}`, { defaultValue: b })
            )
          : section.body,
      })),
    },
  })), [t, i18n.resolvedLanguage]);
};

// 2. PRODUCTS
export const useTranslatedProducts = () => {
  const { t, i18n } = useTranslation();

  return useMemo(() => PRODUCTS.map((p) => ({
    ...p,
    name: t(`products.${p.id}.name`, { defaultValue: p.name }),
    tagline: t(`products.${p.id}.tagline`, { defaultValue: p.tagline }),
    description: t(`products.${p.id}.desc`, { defaultValue: p.description }),
    specs: p.specs.map((spec, i) =>
      t(`products.${p.id}.specs.${i}`, { defaultValue: spec })
    ),
  })), [t, i18n.resolvedLanguage]);
};

// 3. ABOUT
export const useTranslatedAbout = () => {
  const { t, i18n } = useTranslation();
  return useMemo(() => ABOUT_SECTION_CONTENT.map((para, i) =>
    t(`about.p${i + 1}`, { defaultValue: para })
  ), [t, i18n.resolvedLanguage]);
};

// 4. CONTACT EMAILS
export const useTranslatedContactEmails = () => {
  const { t, i18n } = useTranslation();
  return useMemo(() => CONTACT_EMAILS.map((email) => ({
    ...email,
    role: t(`contact.emails.${email.icon}.role`, { defaultValue: email.role }),
    desc: t(`contact.emails.${email.icon}.desc`, { defaultValue: email.desc }),
  })), [t, i18n.resolvedLanguage]);
};

// 5. CONTACT OFFICES
export const useTranslatedContactOffices = () => {
  const { t, i18n } = useTranslation();
  return useMemo(() => CONTACT_OFFICES.map((office, i) => ({
    ...office,
    title: t(`contact.office${i + 1}.title`, { defaultValue: office.title }),
  })), [t, i18n.resolvedLanguage]);
};

// 6. GALLERY
export const useTranslatedGallery = () => {
  const { t, i18n } = useTranslation();

  return useMemo(() => ({
    verticalBanners: GALLERY_CONTENT.verticalBanners.map((item) => ({
      ...item,
      title: t(`gallery.verticalBanners.${item.id}.title`, { defaultValue: item.title }),
      tagline: t(`gallery.verticalBanners.${item.id}.tagline`, { defaultValue: item.tagline }),
      description: item.description
        ? t(`gallery.verticalBanners.${item.id}.description`, { defaultValue: item.description })
        : undefined,
    })),
    droneFleet: GALLERY_CONTENT.droneFleet.map((item) => ({
      ...item,
      title: t(`gallery.droneFleet.${item.id}.title`, { defaultValue: item.title }),
      tagline: t(`gallery.droneFleet.${item.id}.tagline`, { defaultValue: item.tagline }),
      description: t(`gallery.droneFleet.${item.id}.description`, { defaultValue: item.description ?? '' }),
    })),
    specialOffers: GALLERY_CONTENT.specialOffers.map((item) => ({
      ...item,
      title: t(`gallery.specialOffers.${item.id}.title`, { defaultValue: item.title }),
      tagline: t(`gallery.specialOffers.${item.id}.tagline`, { defaultValue: item.tagline }),
      description: t(`gallery.specialOffers.${item.id}.description`, { defaultValue: item.description ?? '' }),
    })),
    innovations: GALLERY_CONTENT.innovations.map((item) => ({
      ...item,
      title: t(`gallery.innovations.${item.id}.title`, { defaultValue: item.title }),
      tagline: t(`gallery.innovations.${item.id}.tagline`, { defaultValue: item.tagline }),
      description: t(`gallery.innovations.${item.id}.description`, { defaultValue: item.description ?? '' }),
    })),
    exhibitions: GALLERY_CONTENT.exhibitions.map((item) => ({
      ...item,
      title: t(`gallery.exhibitions.${item.id}.title`, { defaultValue: item.title }),
      description: t(`gallery.exhibitions.${item.id}.description`, { defaultValue: item.description ?? '' }),
    })),
    pamphlet: GALLERY_CONTENT.pamphlet.map((item) => ({
      ...item,
      title: t(`gallery.pamphlet.${item.id}.title`, { defaultValue: item.title }),
      tagline: t(`gallery.pamphlet.${item.id}.tagline`, { defaultValue: item.tagline }),
      description: t(`gallery.pamphlet.${item.id}.description`, { defaultValue: item.description ?? '' }),
    })),
  }), [t, i18n.resolvedLanguage]);
};

// 7. STATS
export const useTranslatedStats = () => {
  const { t, i18n } = useTranslation();
  const keys = ['responseTime', 'threats', 'uptime'];

  return useMemo(() => STATS.map((stat, i) => ({
    ...stat,
    label: t(`stats.${keys[i]}.label`, { defaultValue: stat.label }),
  })), [t, i18n.resolvedLanguage]);
};

// 8. TEAM
export const useTranslatedTeam = () => {
  const { t, i18n } = useTranslation();
  return useMemo(() => TEAM.map((member) => ({
    ...member,
    role: t(`team.${member.id}.role`, { defaultValue: member.role }),
    bio: t(`team.${member.id}.bio`, { defaultValue: member.bio }),
  })), [t, i18n.resolvedLanguage]);
};

// 9. NAV LINKS
export const useTranslatedNavLinks = () => {
  const { t, i18n } = useTranslation();
  return useMemo(() => NAV_LINKS.map((link) => ({
    ...link,
    name: t(`nav.${link.name.toLowerCase()}`, { defaultValue: link.name }),
  })), [t, i18n.resolvedLanguage]);
};