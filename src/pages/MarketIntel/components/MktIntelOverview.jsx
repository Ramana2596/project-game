
/**
 * Component Name: MktIntelOverview
 * Module: Market Intelligence
 * Purpose: Renders compact uniform cards for categories used in current market data.
 * AI Tags: components, overview, cards, filter, market-intel, ux-lab, accessibility
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { cardStyle, colors } from '../../../ux/styles';
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
  selectedCategory,
  onSelectCategory = () => {}
}) {
  const getCount = (code, description) => {
    if (!code) return data.length;
    return data.filter(item => {
      const itemCat = item.Category?.trim() || '';
      return itemCat.toLowerCase() === description?.toLowerCase() ||
             itemCat.toUpperCase() === code?.toUpperCase();
    }).length;
  };

  const usedCategories = MARKET_CATEGORIES.filter(
    category => getCount(category.code, category.description) > 0
  );

  const cardsData = [
    {
      id: 'ALL',
      code: '',
      description: 'All',
      icon: <DashboardIcon fontSize="small" />,
      count: data.length,
      accent: colors.primary
    },
    ...usedCategories.map((category, index) => ({
      ...category,
      count: getCount(category.code, category.description),
      accent: CARD_ACCENTS[index % CARD_ACCENTS.length]
    }))
  ];

  const selectCategory = category => {
    onSelectCategory(
      category.description === 'All' ? '' : category.description
    );
  };

  const handleKeyDown = (event, category) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectCategory(category);
    }
  };

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: `repeat(${Math.min(cardsData.length, 6)}, 1fr)`
      },
      gap: 1.5,
      mb: 3
    }}>
      {cardsData.map(category => {
        const isSelected =
          selectedCategory === category.description ||
          (category.description === 'All' && !selectedCategory);

        return (
          <Box
            key={category.id}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={`${category.description}: ${category.count} records`}
            onClick={() => selectCategory(category)}
            onKeyDown={event => handleKeyDown(event, category)}
            sx={{
              ...cardStyle.statCard,
              height: 72,
              boxSizing: 'border-box',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 1.5,
              py: 1,
              borderRadius: 1.5,
              border: `1px solid ${isSelected ? category.accent : colors.border}`,
              bgcolor: isSelected ? colors.primarySelected : colors.card,
              color: isSelected ? colors.onPrimarySoft : colors.title,
              boxShadow: isSelected
                ? `0 2px 8px ${colors.shadowColor}`
                : 'none',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                borderColor: category.accent,
                boxShadow: `0 2px 8px ${colors.shadowColor}`,
                transform: 'translateY(-1px)'
              },
              '&:focus-visible': {
                outline: `2px solid ${colors.primary}`,
                outlineOffset: 2,
                boxShadow: `0 0 0 4px ${colors.primarySoft}`
              }
            }}
          >
            <Box sx={{
              width: 36,
              height: 36,
              minWidth: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: isSelected ? colors.iconGradient : category.accent,
              color: colors.onPrimary,
              boxShadow: `0 2px 5px ${colors.shadowColor}`
            }}>
              {category.icon}
            </Box>

            <Box sx={{
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              overflow: 'hidden',
              lineHeight: 1.2
            }}>
              <Typography
                variant="caption"
                sx={{
                  color: isSelected ? colors.onPrimarySoft : colors.subtitle,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
              >
                {category.description}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: isSelected ? colors.onPrimarySoft : colors.title,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mt: 0.2
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
