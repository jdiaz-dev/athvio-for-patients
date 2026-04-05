import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { Meal } from 'src/shared/types/types';

function PlanMealsModal({
  selectedDayMeals,
  setSelectedDayMeals,
}: {
  selectedDayMeals: { day: number; meals: Meal[] } | null;
  setSelectedDayMeals: (data: { day: number; meals: Meal[] } | null) => void;
}) {
  const { width } = useWindowDimensions();
  return (
    <Modal visible={!!selectedDayMeals} transparent animationType="fade" onRequestClose={() => setSelectedDayMeals(null)}>
      {/* Dark overlay — tap outside card to close */}
      <Pressable style={styles.modalOverlay} onPress={() => setSelectedDayMeals(null)}>
        {/* Card — stop event from bubbling to overlay */}
        <Pressable style={{ ...styles.modalCard, width: width <= 850 ? '90%' : '60%' }} onPress={(e) => e.stopPropagation()}>
          {/* ✕ close button */}
          <TouchableOpacity style={styles.modalXButton} onPress={() => setSelectedDayMeals(null)}>
            <Text style={styles.modalXText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.modalHeading}>Comidas del día {selectedDayMeals?.day}</Text>

          <View style={{ flex: 1 }}>
            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={true}>
              {selectedDayMeals?.meals.map((meal, index) => (
                <View key={meal.uuid} style={[styles.mealCard, index > 0 && styles.mealCardSeparator]}>
                  {/* Image */}
                  {meal.image ? (
                    <Image source={{ uri: meal.image }} style={styles.mealImage} resizeMode="cover" />
                  ) : (
                    <View style={styles.mealImagePlaceholder}>
                      <Text style={styles.mealImagePlaceholderText}>🍽️</Text>
                    </View>
                  )}

                  {/* Name */}
                  <Text style={styles.mealName}>{meal.name}</Text>

                  {/* Tag badge */}
                  <View style={styles.mealTagBadge}>
                    <Text style={styles.mealTagText}>{meal.mealTag}</Text>
                  </View>

                  {/* Ingredients */}
                  {meal.ingredientDetails && meal.ingredientDetails.length > 0 && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Ingredientes</Text>
                      {meal.ingredientDetails.map(({ ingredient }, i) => (
                        <View key={i} style={styles.ingredientRow}>
                          <View style={styles.ingredientDot} />
                          <Text style={styles.ingredientText}>
                            {ingredient?.amount} {ingredient?.label} {ingredient?.name}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Recipe */}
                  {meal.cookingInstructions ? (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Preparación</Text>
                      <Text style={styles.recipeText}>{meal.cookingInstructions}</Text>
                    </View>
                  ) : null}
                </View>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default PlanMealsModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center', // ← center vertically
    alignItems: 'center', // ← center horizontally
  },
  modalCard: {
    backgroundColor: '#111111',
    borderRadius: 24, // ← all corners rounded
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 32,
    maxHeight: '60%', // ← medium height (not full screen)
    borderWidth: 1, // ← restore bottom border
    borderColor: '#2a2a2a',
  },
  modalXButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 4,
  },
  modalXText: {
    color: '#888888',
    fontSize: 18,
    fontWeight: '600',
  },
  modalHeading: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  modalScroll: {
    flexGrow: 0,
  },
  mealCard: {
    paddingVertical: 16,
  },
  mealCardSeparator: {
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  mealImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#1a1a1a',
  },
  mealImagePlaceholder: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  mealImagePlaceholderText: {
    fontSize: 40,
  },
  mealName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  mealTagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#0066ff22',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#0066ff55',
  },
  mealTagText: {
    color: '#0066ff',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#888888',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  ingredientDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#0066ff',
  },
  ingredientText: {
    color: '#cccccc',
    fontSize: 14,
  },
  recipeText: {
    color: '#cccccc',
    fontSize: 14,
    lineHeight: 22,
  },
});
