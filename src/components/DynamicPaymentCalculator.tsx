
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calculator, CreditCard, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  calculatePaymentSchedule,
  formatCurrency,
  validatePaymentAmount,
  type DynamicPayment
} from "@/utils/paymentUtils";

interface DynamicPaymentCalculatorProps {
  totalAmount: number;
  minimumDeposit: number;
  paymentTermMonths: number;
  agentInfo: {
    businessName: string;
    contactInfo: string;
  };
  onPaymentScheduleChange?: (schedule: DynamicPayment) => void;
}

export function DynamicPaymentCalculator({
  totalAmount,
  minimumDeposit,
  paymentTermMonths,
  agentInfo,
  onPaymentScheduleChange
}: DynamicPaymentCalculatorProps) {
  const [initialPayment, setInitialPayment] = useState(minimumDeposit);
  const [paymentSchedule, setPaymentSchedule] = useState<DynamicPayment | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Calculate payment schedule whenever initial payment changes
  useEffect(() => {
    try {
      const validation = validatePaymentAmount(initialPayment, minimumDeposit, totalAmount);
      
      if (!validation.isValid) {
        setValidationError(validation.message || "Invalid payment amount");
        setPaymentSchedule(null);
        return;
      }

      setValidationError(null);
      const schedule = calculatePaymentSchedule(
        totalAmount,
        initialPayment,
        paymentTermMonths,
        minimumDeposit,
        agentInfo
      );
      
      setPaymentSchedule(schedule);
      onPaymentScheduleChange?.(schedule);
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : "Calculation error");
      setPaymentSchedule(null);
    }
  }, [initialPayment, totalAmount, minimumDeposit, paymentTermMonths, agentInfo, onPaymentScheduleChange]);

  const handleSliderChange = (value: number[]) => {
    setInitialPayment(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setInitialPayment(value);
  };

  const downloadReceipt = (payment: any) => {
    // In a real app, this would generate and download a PDF receipt
    console.log("Downloading receipt for:", payment);
    alert("Receipt download functionality would be implemented here");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Dynamic Payment Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Amount Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="initial-payment">Initial Payment Amount</Label>
              <Badge variant="outline">
                Total: {formatCurrency(totalAmount)}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <Slider
                value={[initialPayment]}
                onValueChange={handleSliderChange}
                min={minimumDeposit}
                max={totalAmount}
                step={10}
                className="w-full"
              />
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    id="initial-payment"
                    type="number"
                    value={initialPayment}
                    onChange={handleInputChange}
                    min={minimumDeposit}
                    max={totalAmount}
                    step="0.01"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Min: {formatCurrency(minimumDeposit)}
                </div>
              </div>
            </div>

            {validationError && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {validationError}
              </div>
            )}
          </div>

          {/* Payment Summary */}
          {paymentSchedule && (
            <div className="space-y-4">
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Initial Payment</Label>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(paymentSchedule.initialPayment)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Remaining Balance</Label>
                  <div className="text-2xl font-bold">
                    {formatCurrency(paymentSchedule.remainingBalance)}
                  </div>
                </div>
              </div>

              {paymentSchedule.remainingBalance > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>Monthly Payment:</strong> {formatCurrency(paymentSchedule.remainingBalance / paymentTermMonths)}
                  </div>
                  <div className="text-sm text-blue-600 mt-1">
                    Split equally over {paymentTermMonths} months
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Schedule */}
      {paymentSchedule && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Schedule</CardTitle>
            <div className="text-sm text-muted-foreground">
              Payments will be processed by {agentInfo.businessName}
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Receipt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentSchedule.schedule.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.description}</TableCell>
                    <TableCell>{payment.dueDate}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(payment.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={payment.status === 'paid' ? 'default' : 'outline'}
                        className={
                          payment.status === 'paid' 
                            ? 'bg-green-500 hover:bg-green-500/90' 
                            : payment.status === 'overdue'
                            ? 'bg-red-500 text-white hover:bg-red-500/90'
                            : ''
                        }
                      >
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadReceipt(payment)}
                        disabled={payment.status !== 'paid'}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Proceed to Payment */}
      {paymentSchedule && !validationError && (
        <Card className="border-primary">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Ready to proceed?</div>
                <div className="text-sm text-muted-foreground">
                  Initial payment: {formatCurrency(paymentSchedule.initialPayment)}
                </div>
              </div>
              <Button className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Proceed to Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
