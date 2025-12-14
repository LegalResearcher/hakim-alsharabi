import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Calculator, Users, PlusCircle, Trash2, RefreshCw } from "lucide-react";
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

const heirTypes = [
  { value: "son", label: "ابن", share: "عصبة" },
  { value: "daughter", label: "ابنة", share: "النصف أو الثلثين أو عصبة" },
  { value: "father", label: "أب", share: "السدس + عصبة" },
  { value: "mother", label: "أم", share: "الثلث أو السدس" },
  { value: "husband", label: "زوج", share: "الربع أو النصف" },
  { value: "wife", label: "زوجة", share: "الثمن أو الربع" },
  { value: "brother", label: "أخ شقيق", share: "عصبة" },
  { value: "sister", label: "أخت شقيقة", share: "النصف أو الثلثين أو عصبة" },
  { value: "grandfather", label: "جد", share: "السدس + عصبة" },
  { value: "grandmother", label: "جدة", share: "السدس" }
];

const InheritanceCalculator = () => {
  const [estateValue, setEstateValue] = useState<string>("");
  const [heirs, setHeirs] = useState<Heir[]>([]);
  const [calculated, setCalculated] = useState(false);

  const addHeir = () => {
    setHeirs([...heirs, { id: Date.now().toString(), type: "", count: 1 }]);
    setCalculated(false);
  };

  const removeHeir = (id: string) => {
    setHeirs(heirs.filter(h => h.id !== id));
    setCalculated(false);
  };

  const updateHeir = (id: string, field: keyof Heir, value: string | number) => {
    setHeirs(heirs.map(h => h.id === id ? { ...h, [field]: value } : h));
    setCalculated(false);
  };

  const resetCalculator = () => {
    setEstateValue("");
    setHeirs([]);
    setCalculated(false);
  };

  const calculateInheritance = () => {
    if (estateValue && heirs.length > 0) {
      setCalculated(true);
    }
  };

  const getHeirLabel = (type: string) => {
    return heirTypes.find(h => h.value === type)?.label || type;
  };

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
                onChange={(e) => {
                  setEstateValue(e.target.value);
                  setCalculated(false);
                }}
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
                onClick={calculateInheritance}
                disabled={!estateValue || heirs.length === 0 || heirs.some(h => !h.type)}
                className="flex-1 h-14 text-lg bg-purple-600 hover:bg-purple-700"
              >
                <Calculator className="w-5 h-5 ml-2" />
                حساب الميراث
              </Button>
              <Button
                variant="outline"
                onClick={resetCalculator}
                className="h-14"
              >
                <RefreshCw className="w-5 h-5 ml-2" />
                إعادة تعيين
              </Button>
            </div>

            {/* Results */}
            {calculated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800"
              >
                <h3 className="text-xl font-bold text-foreground mb-4">نتائج الحساب</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                    <span className="font-medium">قيمة التركة الإجمالية:</span>
                    <span className="text-xl font-bold text-purple-600">
                      {parseInt(estateValue).toLocaleString()} ريال
                    </span>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h4 className="font-semibold mb-3">توزيع الأنصبة:</h4>
                    <div className="space-y-2">
                      {heirs.filter(h => h.type).map((heir) => (
                        <div key={heir.id} className="flex justify-between items-center p-3 bg-background rounded-lg">
                          <span>
                            {getHeirLabel(heir.type)} {heir.count > 1 && `(${heir.count})`}
                          </span>
                          <span className="font-medium text-purple-600">
                            يُحسب وفقاً للشريعة
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gold/10 rounded-lg border border-gold/30">
                  <p className="text-sm text-foreground">
                    <strong>تنبيه:</strong> هذه الحاسبة تقدم نتائج تقريبية. للحصول على فتوى شرعية دقيقة، يُرجى استشارة عالم شرعي متخصص أو التواصل مع مكتبنا.
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
              <li>• يتم توزيع التركة بعد سداد الديون وتنفيذ الوصايا</li>
              <li>• للذكر مثل حظ الأنثيين في العصبة</li>
              <li>• الزوج يرث النصف إذا لم يكن للمتوفاة فرع وارث</li>
              <li>• الزوجة ترث الربع إذا لم يكن للمتوفى فرع وارث</li>
              <li>• الأم ترث الثلث إذا لم يكن هناك فرع وارث أو جمع من الإخوة</li>
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
