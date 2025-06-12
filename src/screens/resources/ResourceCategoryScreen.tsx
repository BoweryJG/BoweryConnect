import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Linking,
  Platform,
  Share,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getResourcesByCategory, resources, categories } from '../../data/resourcesData';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

interface RouteParams {
  categoryId: string;
}

export default function ResourceCategoryScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { categoryId } = route.params as RouteParams;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [savedResources, setSavedResources] = useState<Set<string>>(new Set());
  
  const category = categories.find(cat => cat.id === categoryId);
  const categoryResources = getResourcesByCategory(categoryId);
  
  const filteredResources = categoryResources.filter(resource =>
    resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleExpanded = (resourceId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(resourceId)) {
      newExpanded.delete(resourceId);
    } else {
      newExpanded.add(resourceId);
    }
    setExpandedCards(newExpanded);
  };

  const toggleSaved = (resourceId: string) => {
    const newSaved = new Set(savedResources);
    if (newSaved.has(resourceId)) {
      newSaved.delete(resourceId);
    } else {
      newSaved.add(resourceId);
    }
    setSavedResources(newSaved);
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone.replace(/[^0-9]/g, '')}`);
  };

  const handleWebsite = (website: string) => {
    if (!website.startsWith('http')) {
      website = `https://${website}`;
    }
    Linking.openURL(website);
  };

  const handleDirections = (address: string) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${encodeURIComponent(address)}`,
      android: `geo:0,0?q=${encodeURIComponent(address)}`,
      default: `https://maps.google.com/maps?q=${encodeURIComponent(address)}`
    });
    Linking.openURL(url);
  };

  const handleShare = async (resource: any) => {
    try {
      const message = `${resource.name}\n\n${resource.description}\n\n` +
        `Address: ${resource.address || 'See website'}\n` +
        `Phone: ${resource.phone || 'N/A'}\n` +
        `Website: ${resource.website || 'N/A'}\n\n` +
        `Services: ${resource.services.slice(0, 3).join(', ')}...`;
        
      await Share.share({
        message,
        title: resource.name,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (!category) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Category not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={[category.color + '10', '#FFFFFF', '#F9FAFB']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <View>
              <Text style={styles.headerTitle}>{category.title}</Text>
              <Text style={styles.headerSubtitle}>{category.subtitle}</Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search resources..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.text.secondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Resource List */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.resourceList}>
            {filteredResources.map((resource) => {
              const isExpanded = expandedCards.has(resource.id);
              const isSaved = savedResources.has(resource.id);

              return (
                <TouchableOpacity
                  key={resource.id}
                  style={styles.resourceCard}
                  onPress={() => toggleExpanded(resource.id)}
                  activeOpacity={0.9}
                >
                  {/* Card Header */}
                  <View style={styles.cardHeader}>
                    <View style={styles.cardTitleSection}>
                      <Text style={styles.resourceName}>{resource.name}</Text>
                      {resource.hours && (
                        <View style={styles.hoursContainer}>
                          <Ionicons name="time-outline" size={14} color={category.color} />
                          <Text style={styles.hoursText}>{resource.hours}</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.cardActions}>
                      <TouchableOpacity 
                        onPress={() => toggleSaved(resource.id)}
                        style={styles.saveButton}
                      >
                        <Ionicons 
                          name={isSaved ? "bookmark" : "bookmark-outline"} 
                          size={20} 
                          color={isSaved ? category.color : colors.text.secondary} 
                        />
                      </TouchableOpacity>
                      <Ionicons 
                        name={isExpanded ? "chevron-up" : "chevron-down"} 
                        size={20} 
                        color={colors.text.secondary} 
                      />
                    </View>
                  </View>

                  {/* Description */}
                  <Text style={styles.resourceDescription}>{resource.description}</Text>

                  {/* Quick Actions */}
                  <View style={styles.quickActions}>
                    {resource.phone && (
                      <TouchableOpacity 
                        style={[styles.quickActionButton, { backgroundColor: category.color + '20' }]}
                        onPress={() => handleCall(resource.phone!)}
                      >
                        <Ionicons name="call" size={16} color={category.color} />
                        <Text style={[styles.quickActionText, { color: category.color }]}>Call</Text>
                      </TouchableOpacity>
                    )}
                    {resource.address && (
                      <TouchableOpacity 
                        style={[styles.quickActionButton, { backgroundColor: category.color + '20' }]}
                        onPress={() => handleDirections(resource.address!)}
                      >
                        <Ionicons name="navigate" size={16} color={category.color} />
                        <Text style={[styles.quickActionText, { color: category.color }]}>Directions</Text>
                      </TouchableOpacity>
                    )}
                    {resource.website && (
                      <TouchableOpacity 
                        style={[styles.quickActionButton, { backgroundColor: category.color + '20' }]}
                        onPress={() => handleWebsite(resource.website!)}
                      >
                        <Ionicons name="globe" size={16} color={category.color} />
                        <Text style={[styles.quickActionText, { color: category.color }]}>Website</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity 
                      style={[styles.quickActionButton, { backgroundColor: category.color + '20' }]}
                      onPress={() => handleShare(resource)}
                    >
                      <Ionicons name="share-social" size={16} color={category.color} />
                      <Text style={[styles.quickActionText, { color: category.color }]}>Share</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <View style={styles.expandedContent}>
                      {/* Services */}
                      <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Services Offered</Text>
                        {resource.services.map((service, index) => (
                          <View key={index} style={styles.serviceItem}>
                            <View style={[styles.serviceBullet, { backgroundColor: category.color }]} />
                            <Text style={styles.serviceText}>{service}</Text>
                          </View>
                        ))}
                      </View>

                      {/* Special Features */}
                      {resource.specialFeatures && resource.specialFeatures.length > 0 && (
                        <View style={styles.section}>
                          <Text style={styles.sectionTitle}>What Makes This Special</Text>
                          {resource.specialFeatures.map((feature, index) => (
                            <View key={index} style={styles.featureItem}>
                              <Ionicons name="star" size={16} color={category.color} />
                              <Text style={styles.featureText}>{feature}</Text>
                            </View>
                          ))}
                        </View>
                      )}

                      {/* Requirements */}
                      {resource.requirements && resource.requirements.length > 0 && (
                        <View style={styles.section}>
                          <Text style={styles.sectionTitle}>Requirements</Text>
                          {resource.requirements.map((req, index) => (
                            <View key={index} style={styles.requirementItem}>
                              <Ionicons name="information-circle" size={16} color="#F59E0B" />
                              <Text style={styles.requirementText}>{req}</Text>
                            </View>
                          ))}
                        </View>
                      )}

                      {/* Contact Details */}
                      <View style={styles.contactDetails}>
                        {resource.address && (
                          <TouchableOpacity 
                            style={styles.contactRow}
                            onPress={() => handleDirections(resource.address!)}
                          >
                            <Ionicons name="location" size={20} color={colors.text.secondary} />
                            <Text style={styles.contactText}>{resource.address}</Text>
                          </TouchableOpacity>
                        )}
                        {resource.phone && (
                          <TouchableOpacity 
                            style={styles.contactRow}
                            onPress={() => handleCall(resource.phone!)}
                          >
                            <Ionicons name="call" size={20} color={colors.text.secondary} />
                            <Text style={styles.contactText}>{resource.phone}</Text>
                          </TouchableOpacity>
                        )}
                        {resource.website && (
                          <TouchableOpacity 
                            style={styles.contactRow}
                            onPress={() => handleWebsite(resource.website!)}
                          >
                            <Ionicons name="globe" size={20} color={colors.text.secondary} />
                            <Text style={styles.contactText}>{resource.website}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {filteredResources.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="file-search-outline" size={48} color={colors.text.secondary} />
              <Text style={styles.emptyStateText}>No resources found</Text>
              <Text style={styles.emptyStateSubtext}>Try adjusting your search</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  backButton: {
    padding: spacing.xs,
    marginRight: spacing.md,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.sizes.md,
    color: colors.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  resourceList: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  resourceCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  cardTitleSection: {
    flex: 1,
  },
  resourceName: {
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hoursText: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    padding: spacing.xs,
    marginRight: spacing.sm,
  },
  resourceDescription: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  quickActionText: {
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  expandedContent: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: spacing.md,
    marginTop: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  serviceBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    marginRight: spacing.sm,
  },
  serviceText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  featureText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
    lineHeight: 20,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  requirementText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
  },
  contactDetails: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: spacing.md,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  contactText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyStateText: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
  emptyStateSubtext: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
});