
/**
 * Component Name: MktIntelOverview
 * Module: Market Intelligence
 * Purpose: Displays compact category cards for filtering market intelligence data.
 * AI Tags: market-intelligence, overview, cards, filter, ux-lab
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { cardStyle, colors, masterTypo } from '../../../ux/styles';
import { MARKET_CATEGORIES } from '../constants/mktIntelConstants';

const CARD_ACCENTS = [
  colors.accentBlue,
  colors.accentTeal,
  colors.accentPurple,
  colors.accentIndigo,
  colors.accentOrange,
  colors.accentRose
];

export function MktIntelOverview({
  data = [],
  selectedCategory = '',
  onSelectCategory = () => {}
}) {
  const getCount = (code, description) => {
    if (!code) return data.length;

    return data.filter(item => {
      const category = item.Category?.trim() || '';
      return category.toLowerCase() === description.toLowerCase() ||
        category.toUpperCase() === code.toUpperCase();
    }).length;
  };

  const categories = MARKET_CATEGORIES.filter(
    category => getCount(category.code, category.description) > 0
  );

  const cards = [
    {
      id: 'ALL',
      description: 'All',
      icon: <DashboardIcon fontSize="small" />,
      count: data.length,
      accent: colors.primary
    },
    ...categories.map((category, index) => ({
      ...category,
      count: getCount(category.code, category.description),
      accent: CARD_ACCENTS[index % CARD_ACCENTS.length]
    }))
  ];

  const selectCategory = category => {
    onSelectCategory(category.description === 'All' ? '' : category.description);
  };

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: `repeat(${Math.min(cards.length, 6)}, 1fr)`
      },
      gap: 1,
      mb: 1.5
    }}>
      {cards.map(category => {
        const selected =
          selectedCategory === category.description ||
          (category.description === 'All' && !selectedCategory);

        return (
          <Box
            key={category.id}
            role="button"
            tabIndex={0}
            aria-pressed={selected}
            aria-label={`${category.description}: ${category.count} records`}
            onClick={() => selectCategory(category)}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                selectCategory(category);
              }
            }}
            sx={{
              ...cardStyle.statCard,
              height: 56,
              boxSizing: 'border-box',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.25,
              py: 0.75,
              borderRadius: 1.25,
              border: `1px solid ${selected ? category.accent : colors.border}`,
              bgcolor: selected ? colors.primarySelected : colors.card,
              boxShadow: selected ? `0 2px 6px ${colors.shadowColor}` : 'none',
              transition: 'all 0.15s ease-in-out',
              '&:hover': {
                borderColor: category.accent,
                boxShadow: `0 2px 6px ${colors.shadowColor}`,
                transform: 'translateY(-1px)'
              },
              '&:focus-visible': {
                outline: `2px solid ${colors.primary}`,
                outlineOffset: 2
              }
            }}
          >
            <Box sx={{
              width: 30,
              height: 30,
              minWidth: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: selected ? colors.iconGradient : category.accent,
              color: colors.onPrimary
            }}>
              {category.icon}
            </Box>

            <Box sx={{
              minWidth: 0,
              display: 'flex',
              alignItems: 'baseline',
              gap: 0.75
            }}>
              <Typography
                sx={{
                  ...masterTypo.bodyB2,
                  color: selected ? colors.onPrimarySoft : colors.subtitle,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {category.description}
              </Typography>

              <Typography
                sx={{
                  ...masterTypo.bodyB1,
                  color: selected ? colors.onPrimarySoft : colors.title,
                  fontWeight: 700,
                  flexShrink: 0
                }}
              >
                {category.count}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
