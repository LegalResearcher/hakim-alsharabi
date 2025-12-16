import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Calculator, Users, PlusCircle, Trash2, RefreshCw, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Heir {
  id: string;
  type: string;
  count: number;
}

interface ShareResult {
  type: string;
  label: string;
  count: number;
  fraction: string;
  amount: number;
  perPerson: number;
}

const heirTypes = [
  { value: "husband", label: "زوج", gender: "male", category: "spouse" },
  { value: "wife", label: "زوجة", gender: "female", category: "spouse" },
  { value: "son", label: "ابن", gender: "male", category: "children" },
  { value: "daughter", label: "ابنة", gender: "female", category: "children" },
  { value: "father", label: "أب", gender: "male", category: "parents" },
  { value: "mother", label: "أم", gender: "female", category: "parents" },
  { value: "grandfather", label: "جد (أب الأب)", gender: "male", category: "grandparents" },
  { value: "grandmother", label: "جدة", gender: "female", category: "grandparents" },
  { value: "brother_full", label: "أخ شقيق", gender: "male", category: "siblings" },
  { value: "sister_full", label: "أخت شقيقة", gender: "female", category: "siblings" },
  { value: "brother_father", label: "أخ لأب", gender: "male", category: "siblings" },
  { value: "sister_father", label: "أخت لأب", gender: "female", category: "siblings" },
  { value: "brother_mother", label: "أخ لأم", gender: "male", category: "siblings_mother" },
  { value: "sister_mother", label: "أخت لأم", gender: "female", category: "siblings_mother" },
  { value: "grandson", label: "ابن الابن", gender: "male", category: "grandchildren" },
  { value: "granddaughter", label: "بنت الابن", gender: "female", category: "grandchildren" },
];

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

const InheritanceCalculator = () => {
  const [estateValue, setEstateValue] = useState<string>("");
  const [heirs, setHeirs] = useState<Heir[]>([]);

  const addHeir = () => {
    setHeirs([...heirs, { id: Date.now().toString(), type: "", count: 1 }]);
  };

  const removeHeir = (id: string) => {
    setHeirs(heirs.filter(h => h.id !== id));
  };

  const updateHeir = (id: string, field: keyof Heir, value: string | number) => {
    setHeirs(heirs.map(h => h.id === id ? { ...h, [field]: value } : h));
  };

  const resetCalculator = () => {
    setEstateValue("");
    setHeirs([]);
  };

  const getHeirLabel = (type: string) => {
    return heirTypes.find(h => h.value === type)?.label || type;
  };

  const getHeirCount = (type: string) => {
    return heirs.filter(h => h.type === type).reduce((sum, h) => sum + h.count, 0);
  };

  const hasHeir = (type: string) => getHeirCount(type) > 0;

  const hasChildren = () => hasHeir("son") || hasHeir("daughter");
  const hasGrandchildren = () => hasHeir("grandson") || hasHeir("granddaughter");
  const hasFarAlFurood = () => hasChildren() || hasGrandchildren();
  const hasMaleBranch = () => hasHeir("son") || hasHeir("grandson");
  const hasMultipleSiblings = () => {
    const siblingTypes = ["brother_full", "sister_full", "brother_father", "sister_father", "brother_mother", "sister_mother"];
    const totalSiblings = siblingTypes.reduce((sum, type) => sum + getHeirCount(type), 0);
    return totalSiblings >= 2;
  };

  const calculationResults = useMemo(() => {
    if (!estateValue || heirs.length === 0 || heirs.some(h => !h.type)) {
      return null;
    }

    const estate = parseFloat(estateValue);
    if (isNaN(estate) || estate <= 0) return null;

    const shares: { type: string; numerator: number; denominator: number; count: number }[] = [];
    let asaba: { type: string; count: number; maleEquivalent: number }[] = [];

    // 1. Spouse Share
    if (hasHeir("husband")) {
      const share = hasFarAlFurood() ? { n: 1, d: 4 } : { n: 1, d: 2 };
      shares.push({ type: "husband", numerator: share.n, denominator: share.d, count: 1 });
    }
    
    if (hasHeir("wife")) {
      const share = hasFarAlFurood() ? { n: 1, d: 8 } : { n: 1, d: 4 };
      shares.push({ type: "wife", numerator: share.n, denominator: share.d, count: getHeirCount("wife") });
    }

    // 2. Father
    if (hasHeir("father")) {
      if (hasMaleBranch()) {
        shares.push({ type: "father", numerator: 1, denominator: 6, count: 1 });
      } else if (hasFarAlFurood()) {
        shares.push({ type: "father", numerator: 1, denominator: 6, count: 1 });
        asaba.push({ type: "father", count: 1, maleEquivalent: 1 });
      } else {
        asaba.push({ type: "father", count: 1, maleEquivalent: 1 });
      }
    }

    // 3. Mother
    if (hasHeir("mother")) {
      if (hasFarAlFurood() || hasMultipleSiblings()) {
        shares.push({ type: "mother", numerator: 1, denominator: 6, count: 1 });
      } else {
        shares.push({ type: "mother", numerator: 1, denominator: 3, count: 1 });
      }
    }

    // 4. Grandfather (if no father)
    if (hasHeir("grandfather") && !hasHeir("father")) {
      if (hasMaleBranch()) {
        shares.push({ type: "grandfather", numerator: 1, denominator: 6, count: 1 });
      } else if (hasFarAlFurood()) {
        shares.push({ type: "grandfather", numerator: 1, denominator: 6, count: 1 });
        asaba.push({ type: "grandfather", count: 1, maleEquivalent: 1 });
      } else {
        asaba.push({ type: "grandfather", count: 1, maleEquivalent: 1 });
      }
    }

    // 5. Grandmother
    if (hasHeir("grandmother") && !hasHeir("mother")) {
      shares.push({ type: "grandmother", numerator: 1, denominator: 6, count: getHeirCount("grandmother") });
    }

    // 6. Sons and Daughters (Asaba)
    if (hasHeir("son")) {
      const sons = getHeirCount("son");
      const daughters = getHeirCount("daughter");
      asaba.push({ type: "son", count: sons, maleEquivalent: sons });
      if (daughters > 0) {
        asaba.push({ type: "daughter", count: daughters, maleEquivalent: daughters * 0.5 });
      }
    } else if (hasHeir("daughter")) {
      const daughters = getHeirCount("daughter");
      if (daughters === 1) {
        shares.push({ type: "daughter", numerator: 1, denominator: 2, count: 1 });
      } else {
        shares.push({ type: "daughter", numerator: 2, denominator: 3, count: daughters });
      }
    }

    // 7. Grandsons and Granddaughters
    if (!hasHeir("son")) {
      if (hasHeir("grandson")) {
        const grandsons = getHeirCount("grandson");
        const granddaughters = getHeirCount("granddaughter");
        asaba.push({ type: "grandson", count: grandsons, maleEquivalent: grandsons });
        if (granddaughters > 0) {
          asaba.push({ type: "granddaughter", count: granddaughters, maleEquivalent: granddaughters * 0.5 });
        }
      } else if (hasHeir("granddaughter") && !hasHeir("daughter")) {
        const granddaughters = getHeirCount("granddaughter");
        if (granddaughters === 1) {
          shares.push({ type: "granddaughter", numerator: 1, denominator: 2, count: 1 });
        } else {
          shares.push({ type: "granddaughter", numerator: 2, denominator: 3, count: granddaughters });
        }
      } else if (hasHeir("granddaughter") && getHeirCount("daughter") === 1) {
        shares.push({ type: "granddaughter", numerator: 1, denominator: 6, count: getHeirCount("granddaughter") });
      }
    }

    // 8. Siblings (only if no children, grandchildren, father, grandfather)
    const blockSiblings = hasHeir("father") || hasHeir("grandfather") || hasHeir("son") || hasHeir("grandson");
    
    if (!blockSiblings) {
      // Full brothers and sisters
      if (hasHeir("brother_full")) {
        const brothers = getHeirCount("brother_full");
        const sisters = getHeirCount("sister_full");
        asaba.push({ type: "brother_full", count: brothers, maleEquivalent: brothers });
        if (sisters > 0) {
          asaba.push({ type: "sister_full", count: sisters, maleEquivalent: sisters * 0.5 });
        }
      } else if (hasHeir("sister_full")) {
        const sisters = getHeirCount("sister_full");
        if (!hasFarAlFurood()) {
          if (sisters === 1) {
            shares.push({ type: "sister_full", numerator: 1, denominator: 2, count: 1 });
          } else {
            shares.push({ type: "sister_full", numerator: 2, denominator: 3, count: sisters });
          }
        }
      }

      // Half brothers/sisters from father
      if (!hasHeir("brother_full") && !hasHeir("sister_full")) {
        if (hasHeir("brother_father")) {
          const brothers = getHeirCount("brother_father");
          const sisters = getHeirCount("sister_father");
          asaba.push({ type: "brother_father", count: brothers, maleEquivalent: brothers });
          if (sisters > 0) {
            asaba.push({ type: "sister_father", count: sisters, maleEquivalent: sisters * 0.5 });
          }
        } else if (hasHeir("sister_father")) {
          const sisters = getHeirCount("sister_father");
          if (!hasFarAlFurood()) {
            if (sisters === 1) {
              shares.push({ type: "sister_father", numerator: 1, denominator: 2, count: 1 });
            } else {
              shares.push({ type: "sister_father", numerator: 2, denominator: 3, count: sisters });
            }
          }
        }
      }

      // Uterine siblings
      if (hasHeir("brother_mother") || hasHeir("sister_mother")) {
        const uterineSiblings = getHeirCount("brother_mother") + getHeirCount("sister_mother");
        if (uterineSiblings === 1) {
          if (hasHeir("brother_mother")) {
            shares.push({ type: "brother_mother", numerator: 1, denominator: 6, count: 1 });
          } else {
            shares.push({ type: "sister_mother", numerator: 1, denominator: 6, count: 1 });
          }
        } else {
          if (hasHeir("brother_mother")) {
            shares.push({ type: "brother_mother", numerator: 1, denominator: 3, count: getHeirCount("brother_mother") });
          }
          if (hasHeir("sister_mother")) {
            shares.push({ type: "sister_mother", numerator: 1, denominator: 3, count: getHeirCount("sister_mother") });
          }
        }
      }
    }

    // Calculate total fixed shares
    let baseDenominator = 1;
    shares.forEach(s => {
      baseDenominator = lcm(baseDenominator, s.denominator);
    });

    let totalFixedParts = 0;
    shares.forEach(s => {
      totalFixedParts += (s.numerator * (baseDenominator / s.denominator));
    });

    const remainingParts = baseDenominator - totalFixedParts;
    const totalAsabaMaleEquiv = asaba.reduce((sum, a) => sum + a.maleEquivalent, 0);

    // Build results
    const results: ShareResult[] = [];
    
    shares.forEach(s => {
      const parts = s.numerator * (baseDenominator / s.denominator);
      const amount = (parts / baseDenominator) * estate;
      results.push({
        type: s.type,
        label: getHeirLabel(s.type),
        count: s.count,
        fraction: `${s.numerator}/${s.denominator}`,
        amount: amount,
        perPerson: amount / s.count,
      });
    });

    if (remainingParts > 0 && totalAsabaMaleEquiv > 0) {
      const asabaAmount = (remainingParts / baseDenominator) * estate;
      asaba.forEach(a => {
        const shareRatio = a.maleEquivalent / totalAsabaMaleEquiv;
        const amount = asabaAmount * shareRatio;
        results.push({
          type: a.type,
          label: getHeirLabel(a.type),
          count: a.count,
          fraction: "عصبة",
          amount: amount,
          perPerson: amount / a.count,
        });
      });
    }

    return {
      estate,
      results,
      baseDenominator,
      totalFixedParts,
      remainingParts,
      hasAwl: totalFixedParts > baseDenominator,
    };
  }, [estateValue, heirs]);

  const canCalculate = estateValue && heirs.length > 0 && !heirs.some(h => !h.type);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-purple-600 to-purple-500">
        <div className="container-legal">
          <Link to="/library" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ChevronRight className="w-5 h-5 ml-1" />
            العودة للمكتبة
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
          >
            حاسبة المواريث الشرعية
          </motion.h1>
          <p className="mt-4 text-white/80 max-w-2xl">
            أداة تفاعلية لحساب الميراث وفقاً لأحكام الشريعة الإسلامية
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 md:py-20">
        <div className="container-legal max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border p-6 md:p-8"
          >
            {/* Estate Value */}
            <div className="mb-8">
              <Label htmlFor="estate" className="text-lg font-semibold text-foreground mb-3 block">
                قيمة التركة (بالريال)
              </Label>
              <Input
                id="estate"
                type="number"
                placeholder="أدخل قيمة التركة الإجمالية"
                value={estateValue}
                onChange={(e) => setEstateValue(e.target.value)}
                className="text-lg h-14"
              />
            </div>

            {/* Heirs */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  الورثة
                </Label>
                <Button onClick={addHeir} variant="outline" size="sm" className="gap-2">
                  <PlusCircle className="w-4 h-4" />
                  إضافة وارث
                </Button>
              </div>

              {heirs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-xl">
                  اضغط على "إضافة وارث" لبدء إدخال الورثة
                </div>
              ) : (
                <div className="space-y-4">
                  {heirs.map((heir) => (
                    <div key={heir.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                      <Select
                        value={heir.type}
                        onValueChange={(value) => updateHeir(heir.id, "type", value)}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="اختر صلة القرابة" />
                        </SelectTrigger>
                        <SelectContent>
                          {heirTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="flex items-center gap-2">
                        <Label className="text-sm text-muted-foreground whitespace-nowrap">العدد:</Label>
                        <Input
                          type="number"
                          min={1}
                          value={heir.count}
                          onChange={(e) => updateHeir(heir.id, "count", parseInt(e.target.value) || 1)}
                          className="w-20"
                        />
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeHeir(heir.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={resetCalculator}
                variant="outline"
                className="h-12"
              >
                <RefreshCw className="w-5 h-5 ml-2" />
                إعادة تعيين
              </Button>
            </div>

            {/* Real-time Results */}
            {calculationResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800"
              >
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  نتائج الحساب
                </h3>
                
                {calculationResults.hasAwl && (
                  <div className="mb-4 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg border border-amber-300 dark:border-amber-700 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <span className="text-sm text-amber-800 dark:text-amber-200">
                      تم تطبيق العول لأن مجموع الأنصبة تجاوز التركة
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                    <span className="font-medium">قيمة التركة الإجمالية:</span>
                    <span className="text-xl font-bold text-purple-600">
                      {calculationResults.estate.toLocaleString('ar-SA')} ريال
                    </span>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h4 className="font-semibold mb-3">توزيع الأنصبة:</h4>
                    <div className="space-y-2">
                      {calculationResults.results.map((result, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-background rounded-lg">
                          <div>
                            <span className="font-medium">{result.label}</span>
                            {result.count > 1 && (
                              <span className="text-muted-foreground mr-2">({result.count})</span>
                            )}
                            <span className="text-sm text-muted-foreground block">
                              النصيب: {result.fraction}
                            </span>
                          </div>
                          <div className="text-left">
                            <span className="font-bold text-purple-600 block">
                              {result.amount.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} ريال
                            </span>
                            {result.count > 1 && (
                              <span className="text-sm text-muted-foreground">
                                ({result.perPerson.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} لكل فرد)
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gold/10 rounded-lg border border-gold/30">
                  <p className="text-sm text-foreground">
                    <strong>تنبيه:</strong> هذه الحاسبة تقدم نتائج تقريبية مبنية على القواعد الأساسية للمواريث. للحصول على فتوى شرعية دقيقة تراعي جميع الحالات الخاصة، يُرجى استشارة عالم شرعي متخصص.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-2xl bg-card border border-border"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">معلومات مهمة عن المواريث</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• يتم توزيع التركة بعد سداد الديون وتنفيذ الوصايا (لا تزيد عن الثلث)</li>
              <li>• للذكر مثل حظ الأنثيين في العصبة</li>
              <li>• الزوج يرث النصف إذا لم يكن للمتوفاة فرع وارث، والربع إذا وُجد</li>
              <li>• الزوجة ترث الربع إذا لم يكن للمتوفى فرع وارث، والثمن إذا وُجد</li>
              <li>• الأم ترث الثلث إذا لم يكن هناك فرع وارث أو جمع من الإخوة</li>
              <li>• الأب يرث السدس مع الفرع الوارث، وعصبة في غيره</li>
              <li>• العول: إذا زادت الأنصبة عن التركة يتم تخفيضها بالتناسب</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default InheritanceCalculator;
