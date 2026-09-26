import { getEdomhBlueprintName } from '../src/app/utils/EdomhBlueprintNames';

describe('EdomhBlueprintNames', function() {
  describe("Mercenary modules", function() {
    it("translates the coriolis-data blueprint fdname into the in-game blueprint name", function() {
      expect(getEdomhBlueprintName('Hpt_MultiCannon_Fixed_Medium', 'Weapon_RapidPhase')).toBe('multicannon_rapid');
      expect(getEdomhBlueprintName('Hpt_BeamLaser_Fixed_Huge', 'Weapon_OverloadedBeam')).toBe('beamlaser_overloaded');
      expect(getEdomhBlueprintName('Hpt_PulseLaserBurst_Gimbal_Medium', 'Weapon_Regenerative')).toBe('burstlaser_regenerative');
      expect(getEdomhBlueprintName('Hpt_Cannon_Fixed_Huge', 'Weapon_ForceImpact')).toBe('cannon_forceimpact');
      expect(getEdomhBlueprintName('Hpt_Railgun_Fixed_Medium', 'Weapon_EnduringFeedback')).toBe('railgun_longshot');
      expect(getEdomhBlueprintName('Int_DetailedSurfaceScanner_Tiny', 'Sensor_LongRangeDSS')).toBe('detailedsurfacescanner_longrange');
      expect(getEdomhBlueprintName('Int_ModuleReinforcement_Size5_Class2', 'MRP_HeavyDuty')).toBe('modulereinforcement_heavyduty');
      expect(getEdomhBlueprintName('Int_PowerDistributor_Size5_Class5', 'PowerDistributor_Balanced')).toBe('powerdistributor_balanced');
    });

    it("disambiguates mercenary variants sharing one coriolis-data blueprint", function() {
      expect(getEdomhBlueprintName('Hpt_Slugshot_Gimbal_Small', 'Weapon_DoubleScreaming')).toBe('fragmentcannonsmall_doublescreaming');
      expect(getEdomhBlueprintName('Hpt_Slugshot_Gimbal_Large', 'Weapon_DoubleScreaming')).toBe('fragmentcannonlarge_doublescreaming');
      expect(getEdomhBlueprintName('Hpt_BasicMissileRack_Fixed_Medium', 'Weapon_LockdownSeeker')).toBe('seekermissilerackmedium_lockdown');
      expect(getEdomhBlueprintName('Hpt_BasicMissileRack_Fixed_Large', 'Weapon_LockdownSeeker')).toBe('seekermissileracklarge_lockdown');
      expect(getEdomhBlueprintName('Int_CargoRack_Size5_Class1', 'CargoRack_Extended')).toBe('cargoracks5c1_extended');
      expect(getEdomhBlueprintName('Int_CargoRack_Size6_Class1', 'CargoRack_Extended')).toBe('cargoracks6c1_extended');
      expect(getEdomhBlueprintName('Int_PowerDistributor_Size3_Class2', 'PowerDistributor_SupportFocused')).toBe('powerdistributors3c2_supportfocused');
      expect(getEdomhBlueprintName('Int_PowerDistributor_Size6_Class5', 'PowerDistributor_SupportFocused')).toBe('powerdistributors6c5_supportfocused');
    });
  });

  describe("Every other blueprint", function() {
    it("returns null so the coriolis-data fdname is sent unchanged", function() {
      expect(getEdomhBlueprintName('Hpt_MultiCannon_Fixed_Medium', 'Weapon_HighCapacity')).toBe(null);
      expect(getEdomhBlueprintName('Hpt_BeamLaser_Fixed_Small', 'Weapon_Efficient')).toBe(null);
      expect(getEdomhBlueprintName('Hpt_Slugshot_Gimbal_Small', 'Weapon_Overcharged')).toBe(null);
      // The mercenary Rapid Phase module only exists as the 2E fixed variant
      expect(getEdomhBlueprintName('Hpt_MultiCannon_Fixed_Large', 'Weapon_RapidPhase')).toBe(null);
      expect(getEdomhBlueprintName(undefined, 'Weapon_RapidPhase')).toBe(null);
    });
  });
});
